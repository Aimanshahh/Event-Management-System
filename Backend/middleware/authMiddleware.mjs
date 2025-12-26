// backend/middleware/authMiddleware.mjs
import jwt from "jsonwebtoken";

/**
 * Verify JWT token and attach user to req.user
 */
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: "Please login first" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // should contain { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

/**
 * Admin check middleware
 */
export const adminCheck = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
};

/**
 * Role-based authorization middleware
 * Usage: authorizeRoles('admin'), authorizeRoles('exhibitor')
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `Access denied: ${roles.join(", ")} only` });
    }
    next();
  };
};
