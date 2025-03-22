import { NextResponse } from 'next/server';
import pool from '@/app/api/conect';

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
