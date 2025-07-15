const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const errorResponse = {
    ...err,
    message: err.message || "Internal server error",
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
