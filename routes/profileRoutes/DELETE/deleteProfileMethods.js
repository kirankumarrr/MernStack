const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

exports.deleteExperienceProfile = function(req, res) {
 Profile.findOne({
   user: req.user.id
  })
  .then(profile => {
   if (!profile) {
    return res.status(404).json({
     profile: 'Profile does not found'
    })
   } else {
    //Get remove index
    const removeIndex = profile.experience.findIndex(item => item.id === req.params.exp_id)
    //splice out the array
    if (removeIndex !== -1) {
     profile.experience.splice(removeIndex, 1);
     profile.save()
      .then(profile => res.json(profile))
      .catch(error => res.status(404).json(error))
    } else {
     return res.status(404).json({
      profile: `experience id doesn't match`
     })
    }
   }
  }).catch(error => res.status(404).json(error))
}


exports.deleteEducationProfile = function(req, res) {
 Profile.findOne({
   user: req.user.id
  })
  .then(profile => {
   if (!profile) {
    return res.status(404).json({
     profile: 'Profile does not found'
    })
   } else {
    //Get remove index
    const removeIndex = profile.education.findIndex(item => item.id === req.params.exp_id)
    //splice out the array
    if (removeIndex !== -1) {
     profile.education.splice(removeIndex, 1);
     profile.save()
      .then(profile => res.json(profile))
      .catch(error => res.status(404).json(error))
    } else {
     return res.status(404).json({
      profile: `education id doesn't match`
     })
    }
   }
  }).catch(error => res.status(404).json(error))
}

exports.deleteUserAndProfile = function(req, res) {
    Profile.findOneAndRemove({user: req.user.id})
     .then(() => {
        User.findOneAndRemove({_id:req.user.id})
        .then(() => {
            return res.json({success:true})
        })
        .catch(error => {
            return res.status(404).json(error)
        })
      }).catch(error => {
        return res.status(404).json(error)
    })
   }