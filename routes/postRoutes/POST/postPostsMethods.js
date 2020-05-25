const Post = require('../../../models/posts')


const validatePostInput = require('../../../validations/post/post')

exports.createPosts = function(req,res){
    const {errors, isValid } = validatePostInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }else{
        const newPost = new Post({
            text:req.body.text,
            name:req.body.name,
            avatar:req.body.avatar,
            user:req.user.id,
        })
        newPost.save()
        .then(post=>res.json(post))
        .catch(error=>res.status(404).json(error))
    }
}