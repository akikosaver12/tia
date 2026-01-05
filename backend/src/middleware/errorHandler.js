// Middleware para errores no encontrados (404)
const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware para manejo de errores generales
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    ...(process.env.NODE_ENV === 'development' && { error: err })
  });
};

module.exports = { notFound, errorHandler };
