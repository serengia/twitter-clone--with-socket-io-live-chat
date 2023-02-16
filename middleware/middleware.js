exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.me = JSON.stringify(req.session?.user);
    return next();
  }
  return res.redirect("/login");
};
