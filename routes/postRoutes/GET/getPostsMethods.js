const Post = require('../../../models/posts')

exports.getPosts = function(req,res){
    Post.find()
    .sort({date:-1})
    .then(posts=>res.json(posts))
    .catch(err=>res.status(404).json({nopostfound:'No posts found'}))
}

exports.getPostsById = function(req,res){
    Post.findById(req.params.id)
    .then(post =>  res.json(post))
    .catch(err=>res.status(404).json({nopostfound:'No posts found with that ID'}))
}