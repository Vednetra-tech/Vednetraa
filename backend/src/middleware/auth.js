import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vednetra_sacred_jwt_token_key_2026_shree_ganesh';

/**
 * Verify JWT token middleware
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'अनधिकृत प्रवेश: कृपया लॉगिन करें (Access token required)'
    });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'सत्र समाप्त या अमान्य टोकन: पुनः लॉगिन करें (Invalid or expired token)'
    });
  }
};

/**
 * Optional JWT token middleware - attaches user if token is present & valid
 */
export const optionalToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next();
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // Continue as guest
  }
  next();
};

/**
 * Role-based authorization middleware
 * @param {string[]} allowedRoles - Array of authorized roles, e.g. ['admin', 'panditji']
 */
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
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

    next();
  };
};
