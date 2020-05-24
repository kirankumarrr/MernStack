const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

exports.deleteExperienceProfile =function(req,res){
    Profile.findOne({user:req.user.id})
            .then(profile=>{
                if(!profile){
                    return res.status(404).json({profile:'Profile does not found'})
                }
               else{
                debugger;
                //Get remove index
                // TODO : fix this 
                const getIds = profile.experience.map(item=>item.id);
                console.log(getIds)
                const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
                //splice out the array
                profile.experience.splice(removeIndex,1);

                profile.save()
                .then(profile=>res.json(profile))
                .catch(error=>res.status(404).json(error))
               }
            }).catch(error=>res.status(404).json(error))
}


exports.deleteEducationProfile= function(req,res){
    Profile.findOne({user:req.user.id})
            .then(profile=>{
                if(!profile){
                    return res.status(404).json({profile:'Profile does not found'})
                }
               else{
                   debugger;
                //Get remove index
                const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);
                //splice out the array
                profile.education.splice(removeIndex,1);

                profile.save()
                .then(profile=>res.json(profile))
                .catch(error=>res.status(404).json(error))
               }
            }).catch(error=>res.status(404).json(error))
}
