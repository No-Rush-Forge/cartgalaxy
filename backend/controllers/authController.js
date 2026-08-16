import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    // Get values from request

    console.log("Body:", req.body);

    const { fullName, email, password } = req.body;

    // Basic validation
    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT user_id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (
      full_name,
      email,
      password_hash)
      VALUES
      ($1,$2,$3)
      RETURNING
        user_id,
        full_name,
        email,
        created_at`,
      [fullName, email, passwordHash],
    );

    const user = result.rows[0];

    return res.json({
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

// Login
// const loginUser = async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err.message);

//     return res.json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// };

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // Find user
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email.toLowerCase()],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Update last login (optional for now)
    await pool.query(
      `UPDATE users
   SET last_login = NOW()
   WHERE user_id = $1`,
      [user.user_id],
    );

    return res.json({
      success: true,
      message: "Login Successful.",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export { registerUser, loginUser };
