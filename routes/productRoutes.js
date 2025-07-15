const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const upload = require("../middlewares/upload");
const { auth } = require("../middlewares/auth");
// 1. Create product
router.post("/", auth, productController.createProduct);

// 2. Get all products (with optional search/filter)
router.get("/", productController.getAllProducts);

// 3. Get single product by ID
router.get("/:id", productController.getProductById);

// 4. Update product
router.put(
  "/:id",
  auth,
  upload.single("image"),
  productController.updateProduct
);

// 5. Delete product
router.delete("/:id", auth, productController.deleteProduct);

// 6. Bulk upload products
router.post("/bulk-upload", auth, productController.bulkUploadProducts);

module.exports = router;
