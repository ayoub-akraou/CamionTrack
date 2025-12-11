import AppError from "../errors/appError.js";

export default function authorize(requiredRole) {
  return (req, res, next) => {
    if (req.user?.role !== requiredRole) {
      return next(new AppError("Accès refusé", 403));
    }

    next();
  };
}
