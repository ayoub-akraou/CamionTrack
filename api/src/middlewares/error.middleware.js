export function errorHandler(err, req, res, next) {
  console.error("Erreur :", err);

  const statusCode = err.statusCode || 500;
  const message = err.isExpected ? err.message : "Erreur interne du serveur";

  res.status(statusCode).json({
    success: false,
    message,
  });
}
