import pool from "../config/db.js";

// ==========================================
// GET PUBLIC STORE
// GET /api/store/:businessName
// ==========================================
export const getStore = async (req, res) => {
  try {
    const { businessName } = req.params;

    const result = await pool.query(
      `
      SELECT
        s.store_id,
        s.business_name,
        s.business_category,
        s.phone,
        s.email,
        s.short_description,
        s.about,
        s.address,
        s.country,
        s.state,
        s.city,
        s.postal_code,
        s.store_slug,
        s.logo_path,
        s.status,
        ss.is_open,
        ss.banner_title,
        ss.banner_subtitle,
        ss.banner_image_path,
        ss.opening_hours,
        ss.delivery_enabled,
        ss.pickup_enabled,
        ss.delivery_charge,
        ss.delivery_notes,
        ss.currency,
        ss.payment_methods,
        ss.contact_links,
        ss.seo_title,
        ss.seo_description
      FROM public.stores s
      LEFT JOIN public.store_settings ss
        ON ss.store_id = s.store_id
      WHERE s.store_slug = $1
        AND s.status = 'Published'
      LIMIT 1
      `,
      [businessName],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found or not published.",
      });
    }

    return res.status(200).json({
      success: true,
      store: result.rows[0],
    });
  } catch (error) {
    console.error("Get Store Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve store.",
    });
  }
};

// ==========================================
// GET LOGGED-IN OWNER'S STORES
// GET /api/store/my-stores
// ==========================================
export const getMyStores = async (req, res) => {
  try {
    const ownerUserId = req.user.user_id;

    const result = await pool.query(
      `
      SELECT
        s.*,
        ss.is_open,
        ss.banner_title,
        ss.banner_subtitle,
        ss.currency
      FROM public.stores s
      LEFT JOIN public.store_settings ss
        ON ss.store_id = s.store_id
      WHERE s.owner_user_id = $1
      ORDER BY s.created_at DESC
      `,
      [ownerUserId],
    );

    return res.status(200).json({
      success: true,
      stores: result.rows,
    });
  } catch (error) {
    console.error("Get My Stores Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve your stores.",
    });
  }
};

// ==========================================
// CREATE STORE
// POST /api/store
// ==========================================
export const createStore = async (req, res) => {
  const client = await pool.connect();

  try {
    const ownerUserId = req.user.user_id;

    const {
      business_name,
      business_category,
      phone,
      email,
      short_description,
      about,
      address,
      country,
      state,
      city,
      postal_code,
      store_slug,
    } = req.body;

    if (!business_name?.trim() || !store_slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Business name and store URL are required.",
      });
    }

    await client.query("BEGIN");

    const storeResult = await client.query(
      `
      INSERT INTO public.stores (
        owner_user_id,
        business_name,
        business_category,
        phone,
        email,
        short_description,
        about,
        address,
        country,
        state,
        city,
        postal_code,
        store_slug
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13
      )
      RETURNING *
      `,
      [
        ownerUserId,
        business_name.trim(),
        business_category || null,
        phone || null,
        email || null,
        short_description || null,
        about || null,
        address || null,
        country || null,
        state || null,
        city || null,
        postal_code || null,
        store_slug.trim().toLowerCase(),
      ],
    );

    const store = storeResult.rows[0];

    await client.query(
      `
      INSERT INTO public.store_settings (store_id)
      VALUES ($1)
      `,
      [store.store_id],
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Store created successfully.",
      store,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create Store Error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "This store URL is already taken. Please choose another.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create store.",
    });
  } finally {
    client.release();
  }
};

// ==========================================
// UPDATE STORE
// PUT /api/store/:storeId
// ==========================================
export const updateStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const ownerUserId = req.user.user_id;

    const {
      business_name,
      business_category,
      phone,
      email,
      short_description,
      about,
      address,
      country,
      state,
      city,
      postal_code,
      store_slug,
    } = req.body;

    if (!business_name?.trim() || !store_slug?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Business name and store URL are required.",
      });
    }

    const result = await pool.query(
      `
      UPDATE public.stores
      SET
        business_name = $1,
        business_category = $2,
        phone = $3,
        email = $4,
        short_description = $5,
        about = $6,
        address = $7,
        country = $8,
        state = $9,
        city = $10,
        postal_code = $11,
        store_slug = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE store_id = $13
        AND owner_user_id = $14
      RETURNING *
      `,
      [
        business_name.trim(),
        business_category || null,
        phone || null,
        email || null,
        short_description || null,
        about || null,
        address || null,
        country || null,
        state || null,
        city || null,
        postal_code || null,
        store_slug.trim().toLowerCase(),
        storeId,
        ownerUserId,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found or you do not have permission to update it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store updated successfully.",
      store: result.rows[0],
    });
  } catch (error) {
    console.error("Update Store Error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "This store URL is already taken.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update store.",
    });
  }
};

// ==========================================
// GET STORE PRODUCT
// GET /api/store/:businessName/products/:productId
// Products database will be connected in the
// Products implementation step.
// ==========================================
export const getStoreProduct = async (req, res) => {
  return res.status(501).json({
    success: false,
    message: "Store product functionality is not implemented yet.",
  });
};


// GET STORE SETTINGS
// GET /api/store/:storeId/settings

export const getStoreSettings = async (req, res) => {
  try {
    const { storeId } = req.params;
    const ownerUserId = req.user.user_id;

    const result = await pool.query(
      `
      SELECT
        s.status,
        s.about,
        ss.*
      FROM public.stores s
      INNER JOIN public.store_settings ss
        ON ss.store_id = s.store_id
      WHERE s.store_id = $1
        AND s.owner_user_id = $2
      `,
      [storeId, ownerUserId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found or access denied.",
      });
    }

    return res.status(200).json({
      success: true,
      settings: result.rows[0],
    });
  } catch (error) {
    console.error("Get Store Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve store settings.",
    });
  }
};


// UPDATE STORE SETTINGS
// PUT /api/store/:storeId/settings

export const updateStoreSettings = async (req, res) => {
  const client = await pool.connect();

  try {
    const { storeId } = req.params;
    const ownerUserId = req.user.user_id;

    const {
      status,
      about,
      isOpen,
      bannerTitle,
      bannerSubtitle,
      hours,
      deliveryAvailable,
      pickupAvailable,
      deliveryCharge,
      deliveryNotes,
      currency,
      paymentMethods,
      contact,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!["Draft", "Published"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid store status.",
      });
    }

    if (!["INR", "USD", "AED"].includes(currency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid store currency.",
      });
    }

    if (
      !Number.isFinite(Number(deliveryCharge)) ||
      Number(deliveryCharge) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery charge.",
      });
    }

    const allowedPaymentMethods = ["cash", "upi", "bankTransfer"];

    if (
      !Array.isArray(paymentMethods) ||
      paymentMethods.some(
        (method) => !allowedPaymentMethods.includes(method)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment methods.",
      });
    }

    await client.query("BEGIN");

    const storeResult = await client.query(
      `
      UPDATE public.stores
      SET
        status = $1,
        about = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE store_id = $3
        AND owner_user_id = $4
      RETURNING store_id
      `,
      [status, about || null, storeId, ownerUserId]
    );

    if (storeResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Store not found or access denied.",
      });
    }

    await client.query(
      `
      UPDATE public.store_settings
      SET
        is_open = $1,
        banner_title = $2,
        banner_subtitle = $3,
        opening_hours = $4::jsonb,
        delivery_enabled = $5,
        pickup_enabled = $6,
        delivery_charge = $7,
        delivery_notes = $8,
        currency = $9,
        payment_methods = $10,
        contact_links = $11::jsonb,
        seo_title = $12,
        seo_description = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE store_id = $14
      `,
      [
        isOpen,
        bannerTitle || null,
        bannerSubtitle || null,
        JSON.stringify(hours || {}),
        deliveryAvailable,
        pickupAvailable,
        Number(deliveryCharge),
        deliveryNotes || null,
        currency,
        paymentMethods,
        JSON.stringify(contact || {}),
        seoTitle || null,
        seoDescription || null,
        storeId,
      ]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Store settings updated successfully.",
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Update Store Settings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update store settings.",
    });

  } finally {
    client.release();
  }
};

