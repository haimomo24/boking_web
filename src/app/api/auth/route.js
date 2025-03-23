import { NextResponse } from 'next/server';
import pool from '@/app/api/conect';

// Hàm xử lý đăng nhập
export async function POST(request) {
  let connection;
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Query user from database
    const [rows] = await connection.query(
      'SELECT * FROM user WHERE email = ? LIMIT 1',
      [email]
    );

    // Check if user exists
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = rows[0];

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
  } finally {
    // Release connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}

// Hàm xử lý đăng ký
export async function PUT(request) {
  let connection;
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Username, email and password are required' },
        { status: 400 }
      );
    }

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Check if email already exists
    const [emailCheck] = await connection.query(
      'SELECT * FROM user WHERE email = ? LIMIT 1',
      [email]
    );

    if (emailCheck.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Check if username already exists
    const [usernameCheck] = await connection.query(
      'SELECT * FROM user WHERE username = ? LIMIT 1',
      [username]
    );

    if (usernameCheck.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Username already taken' },
        { status: 409 }
      );
    }

    // Insert new user with default level 'user' and empty avatar
    await connection.query(
      'INSERT INTO user (username, email, password, level, avatar) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, 'user', '']
    );

    return NextResponse.json({
      success: true,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  } finally {
    // Release connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}
