
function verify(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract the token from the 'Authorization' header
    if (!token) {
      return res.status(403).json({ msg: "A token is required for authentication" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user to request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
module.exports = verify;