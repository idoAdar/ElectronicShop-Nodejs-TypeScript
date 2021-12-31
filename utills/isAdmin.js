const adminChack = (req, res, next) => {
  const isAdmin = req.currentUser.isAdmin;
  if (!isAdmin) {
    return res.status(401).json({ message: 'Unauthorized - Not Admin' });
  }
  next();
};

module.exports = adminChack;
