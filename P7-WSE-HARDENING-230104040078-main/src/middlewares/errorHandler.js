module.exports = (err, req, res, next) => {
  // Mencetak error ke console untuk debugging
  console.error(err.stack);

  // Memberikan response error yang konsisten dalam format JSON
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
