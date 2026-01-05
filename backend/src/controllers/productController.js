const Product = require('../models/Product');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    
    // Construir filtros dinámicos
    let filters = { active: true };
    
    if (category) {
      filters.category = category;
    }
    
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(filters).sort({ createdAt: -1 });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener productos', 
      error: error.message 
    });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener producto', 
      error: error.message 
    });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      message: 'Producto creado exitosamente',
      product
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al crear producto', 
      error: error.message 
    });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json({
      message: 'Producto actualizado exitosamente',
      product
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error al actualizar producto', 
      error: error.message 
    });
  }
};

// @desc    Eliminar un producto (soft delete)
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json({
      message: 'Producto eliminado exitosamente',
      product
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar producto', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
