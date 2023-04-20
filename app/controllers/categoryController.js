const Categoria = require('../models/categoria');

// Crear un nuevo producto
exports.crearCategoria = async (req, res, next) => {
  try {
    const categoria = new Categoria(req.body);
    await Categoria.save();
    res.json(Categoria);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Obtener todos los productos
exports.obtenerCategorias = async (req, res, next) => {
  try {
    const categorias = await Categoria.find({});
    res.json(categorias);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Obtener un producto por su ID
exports.obtenerCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      res.status(404).json({ mensaje: 'La categoria no existe' });
      return next();
    }
    res.json(categoria);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Actualizar un producto por su ID
exports.actualizarCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(categoria);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Eliminar un producto por su ID
exports.eliminarCategoria = async (req, res, next) => {
  try {
    await Categoria.findOneAndDelete({ _id: req.params.id });
    res.json({ mensaje: 'La categoria ha sido eliminada' });
  } catch (error) {
    console.log(error);
    next();
  }
};
