import { NextResponse } from 'next/server';
import dbUtils, { sql, poolPromise } from '../conect';

// Hàm xử lý đăng nhập
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Kết nối đến database
    const pool = await poolPromise;

    // Query user from database
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM dbo.users WHERE email = @email');

    // Check if user exists
    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result.recordset[0];

    // Check password
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Remove password from user object before sending response
    const { password: _, ...userWithoutPassword } = user;

    // Return success response with user data
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

// Hàm xử lý đăng ký
export async function PUT(request) {
  try {
    console.log('Starting registration process');
    const { username, email, password } = await request.json();
    console.log('Received data:', { username, email, password: '***' });

    // Validate input
    if (!username || !email || !password) {
      console.log('Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Username, email and password are required' },
        { status: 400 }
      );
    }

    // Kết nối đến database
    console.log('Connecting to database');
    const pool = await poolPromise;
    console.log('Connected to database');

    // Check if email already exists - Sử dụng cú pháp SQL Server
    console.log('Checking if email exists:', email);
    const emailCheckResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT TOP 1 * FROM users WHERE email = @email');

    if (emailCheckResult.recordset.length > 0) {
      console.log('Email already exists');
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Check if username already exists - Sử dụng cú pháp SQL Server
    console.log('Checking if username exists:', username);
    const usernameCheckResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT TOP 1 * FROM users WHERE username = @username');

    if (usernameCheckResult.recordset.length > 0) {
      console.log('Username already exists');
      return NextResponse.json(
        { success: false, message: 'Username already taken' },
        { status: 409 }
      );
    }

    // Kiểm tra cấu trúc bảng trước khi chèn
    console.log('Checking table structure');
    try {
      const tableStructure = await pool.request()
        .query(`
          SELECT COLUMN_NAME, DATA_TYPE 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'users'
        `);
      console.log('Table structure:', tableStructure.recordset);
    } catch (structureError) {
      console.error('Error checking table structure:', structureError);
    }

    // Insert new user with default level 'user' and empty avatar
    console.log('Inserting new user');
    try {
      await pool.request()
        .input('username', sql.NVarChar, username)
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, password)
        .input('level', sql.Int, 1) // Default level 1 for regular users
        .input('avatar', sql.NVarChar, '') // Empty avatar
        .query(`
          INSERT INTO users (username, email, password, level, avatar) 
          VALUES (@username, @email, @password, @level, @avatar)
        `);
      console.log('User inserted successfully');
    } catch (insertError) {
      console.error('Error inserting user:', insertError);
      throw insertError; // Re-throw để bắt ở catch bên ngoài
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server error', 
        error: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
