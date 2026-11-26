import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check current user status from database
    const result = await pool.query(
      `
      SELECT
        user_id,
        email,
        role,
        is_active
      FROM users
      WHERE user_id = $1
      `,
      [decoded.user_id],
    );

    // User no longer exists
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    const currentUser = result.rows[0];

    // Block inactive users
    if (!currentUser.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    // Store CURRENT user information
    req.user = {
      user_id: currentUser.user_id,
      email: currentUser.email,
      role: currentUser.role,
    };

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;