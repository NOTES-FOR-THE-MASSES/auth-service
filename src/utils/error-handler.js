module.exports = {
  handleError: (err, req, res, next) => {
    if (req.xhr) {
      res.status(400).send(err.stack);
    } else {
      res.status(500).send(err.stack);
    }
    next();
  },
};
