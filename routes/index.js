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

// Use the routes with appropriate base paths
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/carts", auth, cartRoutes);
router.use("/products", productRoutes);
router.use("/orders", auth, orderRoutes);
router.use("/ratings", ratingRoutes);

module.exports = router;
