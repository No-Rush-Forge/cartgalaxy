import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const register = async (req, res) => {
  try {
    // Get values from request
    const fullName = req.body.fullName?.trim();
    const phone = req.body.phone?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Basic validation
    if (!fullName || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Phone number validation (8 to 15 digits for international support)
    if (!/^[0-9]{8,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain 8 to 15 digits.",
      });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT user_id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users
      (
        full_name,
        phone,
        email,
        password_hash
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING
        user_id,
        full_name,
        phone,
        email,
        created_at`,
      [fullName, phone, email, passwordHash]
    );

    const user = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: user,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};