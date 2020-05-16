exports.getCurrentProfile = function(req, res, next){
    var id = req.params.id;
    req.user = users[id];
    if (req.user) {
      next();
    } else {
      var err = new Error('cannot find user ' + id);
      err.status = 404;
      next(err);
    }
  };