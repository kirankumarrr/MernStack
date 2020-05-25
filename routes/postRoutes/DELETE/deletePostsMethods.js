const Post = require('../../../models/posts')
const Profile = require('../../../models/Profile');

/**
 * 401 : Unauthorization
*/
exports.deletePostsById = function(req,res){
    Profile.findOne({user:req.user.id})
        .then(profile=>{
            Post.findById(req.params.id)
                .then(post=>{
                    // check for post owner
                    if(post.user.toString()!==req.user.id){
                        return res.status(401).json({noauthorized:"User is not authorized"})
                    }

                    // Delete
                    post.remove().then(()=>res.json({success:true}))
                })
                .catch(error=>res.status(404).json({nopostfound:'No posts found'}))
        })
}   

exports.deleteComment= function(req,res){
    Post.findById(req.params.postId).then(post=>{
        //check to see if comment exists
        if(post.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length===0){
            return res.status(404).json({ commentnoexist:'Comment does not exits'})
        }
        //get comments index
        const getRemoveIdx = post.comments.findIndex(item=>item._id.toString()===req.params.comment_id)
        if(getRemoveIdx!==-1){
            post.comments.splice(getRemoveIdx,1);
        }
        post.save().then(post=>res.json(post))
        .catch(error=>res.status(404).json(error))
    }).catch(error=>res.status(404).json({postnotfound:'No comment found'}))
}
