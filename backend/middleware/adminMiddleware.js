import pool from "../config/db.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
      SELECT user_id, role, is_active
      FROM users
      WHERE user_id = $1
      `,
      [req.user.user_id],
    );

    // User no longer exists
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    const currentUser = result.rows[0];

    // Inactive user cannot access admin APIs
    if (!currentUser.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    // Check CURRENT database role
    if (currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });
  }
};

export default adminMiddleware;