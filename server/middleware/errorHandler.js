export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('[TripAI Server Error]:', err.stack || err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Internal Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
