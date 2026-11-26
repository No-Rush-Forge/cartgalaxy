import pool from "../config/db.js";


const getAdminUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        user_id,
        full_name,
        email,
        phone,
        country,
        state,
        city,
        business_category,
        role,
        is_active,
        created_at,
        updated_at,
        last_login
      FROM users
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Admin Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users.",
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    const allowedRoles = ["user", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Allowed roles are user or admin.",
      });
    }

    // Check whether user exists
    const userResult = await pool.query(
      `
      SELECT user_id, full_name, email, role
      FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent admin from changing their own role
    if (req.user.user_id === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role.",
      });
    }

    // Update role
    const result = await pool.query(
      `
      UPDATE users
      SET
        role = $1,
        updated_at = NOW()
      WHERE user_id = $2
      RETURNING
        user_id,
        full_name,
        email,
        role,
        is_active,
        updated_at
      `,
      [role, userId],
    );

    return res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("Update User Role Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user role.",
    });
  }
};


export { 
  getAdminUsers,
updateUserRole};