import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import pool from "../config/db.js";
import supabase from "../config/supabase.js";

const BUCKET_NAME = "profile-pictures";

// Generate the public URL from the stored Supabase path
const getProfilePictureUrl = (path) => {
  if (!path) return null;

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  return data.publicUrl;
};

// Validate actual image file signatures
const validateImageBuffer = (file) => {
  const buffer = file.buffer;

  if (!buffer || buffer.length < 12) return false;

  if (
    file.mimetype === "image/jpeg" &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return true;
  }

  if (
    file.mimetype === "image/png" &&
    buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return true;
  }

  if (
    file.mimetype === "image/webp" &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }

  return false;
};

/*
========================================
GET LOGGED-IN USER PROFILE
========================================
*/
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        user_id,
        full_name,
        email,
        phone,
        date_of_birth,
        gender,
        role,
        is_active,
        created_at,
        last_login,
        profile_picture_path
      FROM users
      WHERE user_id = $1
      `,
      [req.user.user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      user: {
        ...user,
        profile_picture_url: getProfilePictureUrl(user.profile_picture_path),
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/*
========================================
UPDATE LOGGED-IN USER PROFILE
========================================
*/
const updateProfile = async (req, res) => {
  try {
    const { full_name, phone, date_of_birth, gender } = req.body;

    if (!full_name || !full_name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET
        full_name = $1,
        phone = $2,
        date_of_birth = $3,
        gender = $4,
        updated_at = NOW()
      WHERE user_id = $5
      RETURNING
        user_id,
        full_name,
        email,
        phone,
        date_of_birth,
        gender,
        role,
        is_active,
        created_at,
        last_login,
        profile_picture_path
      `,
      [
        full_name.trim(),
        phone || null,
        date_of_birth || null,
        gender || null,
        req.user.user_id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        ...user,
        profile_picture_url: getProfilePictureUrl(user.profile_picture_path),
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/*
========================================
UPLOAD PROFILE PICTURE
POST /api/users/profile-picture
========================================
*/
const uploadProfilePicture = async (req, res) => {
  let uploadedPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    if (!validateImageBuffer(req.file)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid image file. Please upload a valid JPG, PNG or WEBP image.",
      });
    }

    const userId = req.user.user_id;

    const extensionMap = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };

    const extension = extensionMap[req.file.mimetype];

    uploadedPath = `${userId}/${randomUUID()}.${extension}`;

    // Upload the new image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uploadedPath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      throw uploadError;
    }

    // Get the user's previous image path
    const previousResult = await pool.query(
      `
      SELECT profile_picture_path
      FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (previousResult.rows.length === 0) {
      await supabase.storage.from(BUCKET_NAME).remove([uploadedPath]);

      uploadedPath = null;

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const previousPath = previousResult.rows[0].profile_picture_path;

    // Save the new image path in the database
    try {
      await pool.query(
        `
        UPDATE users
        SET
          profile_picture_path = $1,
          updated_at = NOW()
        WHERE user_id = $2
        `,
        [uploadedPath, userId],
      );
    } catch (dbError) {
      await supabase.storage.from(BUCKET_NAME).remove([uploadedPath]);

      uploadedPath = null;

      throw dbError;
    }

    // Remove the previous image after successfully saving the new one
    if (previousPath && previousPath !== uploadedPath) {
      const { error: removeError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([previousPath]);

      if (removeError) {
        console.error("Previous image cleanup error:", removeError);
      }
    }

    const pictureUrl = getProfilePictureUrl(uploadedPath);

    return res.json({
      success: true,
      message: "Profile picture uploaded successfully.",
      profile_picture_path: uploadedPath,
      profile_picture_url: pictureUrl,
    });
  } catch (error) {
    console.error("Upload Profile Picture Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload profile picture.",
    });
  }
};

/*
========================================
REMOVE PROFILE PICTURE
DELETE /api/users/profile-picture
========================================
*/
const removeProfilePicture = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `
      SELECT profile_picture_path
      FROM users
      WHERE user_id = $1
      `,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const imagePath = result.rows[0].profile_picture_path;

    if (!imagePath) {
      return res.json({
        success: true,
        message: "No profile picture to remove.",
      });
    }

    // Clear the user's image path in the database
    await pool.query(
      `
      UPDATE users
      SET
        profile_picture_path = NULL,
        updated_at = NOW()
      WHERE user_id = $1
      `,
      [userId],
    );

    // Remove only the image belonging to this user
    const expectedPrefix = `${userId}/`;

    if (imagePath.startsWith(expectedPrefix)) {
      const { error: removeError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([imagePath]);

      if (removeError) {
        console.error("Supabase Remove Error:", removeError);
      }
    }

    return res.json({
      success: true,
      message: "Profile picture removed successfully.",
      profile_picture_path: null,
      profile_picture_url: null,
    });
  } catch (error) {
    console.error("Remove Profile Picture Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove profile picture.",
    });
  }
};


const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { currentPassword } = req.body;

    // 1. Validate password input
    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required.",
      });
    }

    // 2. Get the user's password hash and profile picture path
    const userResult = await pool.query(
      `SELECT password_hash, profile_picture_path
       FROM public.users
       WHERE user_id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const user = userResult.rows[0];

    // 3. Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect current password.",
      });
    }

    // 4. Delete the user from PostgreSQL
    const deleteResult = await pool.query(
      `DELETE FROM public.users
       WHERE user_id = $1
       RETURNING user_id`,
      [userId]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User account could not be found.",
      });
    }

    // 5. Delete profile picture from Supabase Storage
    const profilePicturePath = user.profile_picture_path;

    if (profilePicturePath) {
      // Only allow deletion inside this user's own folder
      if (profilePicturePath.startsWith(`${userId}/`)) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([profilePicturePath]);

        if (storageError) {
          console.error(
            "Account deleted, but profile picture cleanup failed:",
            storageError
          );
        }
      } else {
        console.error(
          "Account deleted, but profile picture path was outside the user's folder:",
          profilePicturePath
        );
      }
    }

    // 6. Send successful response
    return res.status(200).json({
      success: true,
      message: "Your account has been permanently deleted.",
    });

  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete your account. Please try again.",
    });
  }
};


/*
========================================
CHANGE PASSWORD
========================================
*/
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters.",
      });
    }

    const result = await pool.query(
      `
      SELECT password_hash
      FROM users
      WHERE user_id = $1
      `,
      [req.user.user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users
      SET
        password_hash = $1,
        updated_at = NOW()
      WHERE user_id = $2
      `,
      [passwordHash, req.user.user_id],
    );

    return res.json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get user preferences
export const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT
        theme_mode,
        accent_color,
        language,
        email_notifications,
        push_notifications,
        marketing_notifications
       FROM public.user_preferences
       WHERE user_id = $1`,
      [userId],
    );

    // Create default preferences if this user has none
    if (result.rows.length === 0) {
      const insertResult = await pool.query(
        `INSERT INTO public.user_preferences (user_id)
         VALUES ($1)
         RETURNING
           theme_mode,
           accent_color,
           language,
           email_notifications,
           push_notifications,
           marketing_notifications`,
        [userId],
      );

      return res.status(200).json({
        success: true,
        preferences: insertResult.rows[0],
      });
    }

    return res.status(200).json({
      success: true,
      preferences: result.rows[0],
    });
  } catch (error) {
    console.error("Get user preferences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user preferences.",
    });
  }
};

// Update user preferences
export const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const {
      theme_mode,
      accent_color,
      language,
      email_notifications,
      push_notifications,
      marketing_notifications,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public.user_preferences (
        user_id,
        theme_mode,
        accent_color,
        language,
        email_notifications,
        push_notifications,
        marketing_notifications,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())

      ON CONFLICT (user_id)
      DO UPDATE SET
        theme_mode = EXCLUDED.theme_mode,
        accent_color = EXCLUDED.accent_color,
        language = EXCLUDED.language,
        email_notifications = EXCLUDED.email_notifications,
        push_notifications = EXCLUDED.push_notifications,
        marketing_notifications = EXCLUDED.marketing_notifications,
        updated_at = NOW()

      RETURNING
        theme_mode,
        accent_color,
        language,
        email_notifications,
        push_notifications,
        marketing_notifications`,
      [
        userId,
        theme_mode ?? "system",
        accent_color ?? "Blue",
        language ?? "English",
        email_notifications ?? true,
        push_notifications ?? true,
        marketing_notifications ?? false,
      ],
    );

    return res.status(200).json({
      success: true,
      message: "Preferences updated successfully.",
      preferences: result.rows[0],
    });
  } catch (error) {
    console.error("Update user preferences error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user preferences.",
    });
  }
};

export {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfilePicture,
  removeProfilePicture,
  deleteAccount,
};
