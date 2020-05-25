const Post = require('../../../models/posts')
const Profile = require('../../../models/Profile');

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

exports.likePosts = function(req,res){
    Profile.findOne({user:req.user.id}).then(profile=>{
            Post.findById(req.params.id).then(post=>{
                    if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                        return res.status(400).json({alreadyliked:'User already liked this post'})
                    }else{
                        post.likes.unshift({user:req.user.id})
                    }
                    post.save().then(post=>res.json(post))
                    .catch(error=>res.status(404).json(error))
                })
                .catch(error=>res.status(404).json({nopostfound:'No posts found'}))
        })
} 

//Note : likes & unlikes to done by postID
exports.unLikePosts = function(req,res){
    Profile.findOne({user:req.user.id}).then(profile=>{
            Post.findById(req.params.id).then(post=>{
                    if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
                        return res.status(400).json({notliked:'You have not yet liked this post'})
                    }else{
                        //Get remove index
                        const removeIdx = post.likes.findIndex(item=>item.user.toString()===req.user.id);
                        if(removeIdx!==-1){
                            post.likes.splice(removeIdx,1);
                            post.save().then(post=>res.json(post))
                            .catch(error=>res.status(404).json(error))
                        }
                    }
                    
                })
                .catch(error=>res.status(404).json({nopostfound:'No posts found'}))
        })
}

exports.comment= function(req,res){
    const {errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    else{
        Post.findById(req.params.id).then(post=>{
            const newComment = {
                text:req.body.text,
                name:req.body.name,
                avatar:req.body.avatar,
                user:req.user.id,
            }
    
            //Adding comments
            post.comments.unshift(newComment);
            post.save().then(post=>res.json(post))
            .catch(error=>res.status(404).json(error))
        }).catch(error=>res.status(404).json({postnotfound:'No comment found'}))
    }
}