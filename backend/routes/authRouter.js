import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    success: true,
    message: "Register route is working",
    data: req.body,
  });
});

export default router;