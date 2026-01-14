const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Simple API Key Check (matches client-side env password)
      const adminPassword = process.env.VITE_ADMIN_PASSWORD;

      console.log(
        `[AuthDebug] Received Token: "${token}" | Expected: "${adminPassword}"`
      );

      if (token === adminPassword) {
        // Mock an admin user object for compatibility
        req.user = { role: "admin" };
        next();
      } else {
        throw new Error("Not authorized, invalid token");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, adminOnly };
