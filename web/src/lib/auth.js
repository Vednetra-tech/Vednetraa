/**
 * VedNetra - JWT verification and role-based access (ported from Express middleware).
 * Middleware signature stays (req, res, next) so runController can execute it.
 */
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'vednetra_sacred_jwt_token_key_2026_shree_ganesh';

const readToken = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
};

/** Verify JWT token middleware */
export const verifyToken = (req, res, next) => {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'अनधिकृत प्रवेश: कृपया लॉगिन करें (Access token required)'
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({
      success: false,
      message: 'सत्र समाप्त या अमान्य टोकन: पुनः लॉगिन करें (Invalid or expired token)'
    });
  }
  return next();
};

/** Optional JWT token middleware - attaches user if token is present and valid */
export const optionalToken = (req, res, next) => {
  const token = readToken(req);
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      // Continue as guest
    }
  }
  return next();
};

/**
 * Role-based authorization middleware
 * @param {string[]} allowedRoles - e.g. ['admin', 'panditji']
 */
export const requireRole = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'कृपया पहले लॉगिन करें (Authentication required)'
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'अनुमति नहीं है: केवल अधिकृत उपयोगकर्ता ही यह कार्य कर सकते हैं (Forbidden)'
    });
  }

  return next();
};
