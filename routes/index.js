const express = require("express");
const router = express.Router();

// Import all route modules
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const ratingRoutes = require("./ratingRoutes");
const authRoutes = require("./authRoutes");
const { auth } = require("../middlewares/auth");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/carts", auth, cartRoutes);
router.use("/products", productRoutes);
router.use("/orders", auth, orderRoutes);
router.use("/ratings", auth, ratingRoutes);

module.exports = router;
