// Yeh function check karega ke user ka role allowed roles mein hai ya nahi
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role (${req.user.role}) is not allowed to access this resource`);
    }
    next();
  };
};

module.exports = { authorize };