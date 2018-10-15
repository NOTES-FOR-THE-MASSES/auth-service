module.exports = {
  handleError: (err, req, res, next) => {
    console.log(req.xhr);
    if (req.xhr) {
      res.status(400).send(err);
    } else {
      res.status(500).send(err);
    }
    next();
  },
};
