const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Rutas de productos
router.route('/')
  .get(getAllProducts)     // GET /api/products
  .post(createProduct);    // POST /api/products

router.route('/:id')
  .get(getProductById)     // GET /api/products/:id
  .put(updateProduct)      // PUT /api/products/:id
  .delete(deleteProduct);  // DELETE /api/products/:id

module.exports = router;
