const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

const validateProfileInput = require('../../../validations/profile');
const validateExperienceInput =require('../../../validations/profile/experience')
const validateEducationInput = require('../../../validations/profile/education')

exports.createUserProfile = function(req, res) {

 const {
  errors,
  isValid
 } = validateProfileInput(req.body);

 // Check Validation
 if (!isValid) {
  // Return any errors with 400 status
  return res.status(400).json(errors);
 }
 // Get fields
 const profileFields = {};
 profileFields.user = req.user.id;
 if (req.body.handle) profileFields.handle = req.body.handle;
 if (req.body.company) profileFields.company = req.body.company;
 if (req.body.website) profileFields.website = req.body.website;
 if (req.body.location) profileFields.location = req.body.location;
 if (req.body.bio) profileFields.bio = req.body.bio;
 if (req.body.status) profileFields.status = req.body.status;
 if (req.body.githubusername)
  profileFields.githubusername = req.body.githubusername;
 // Skills - Spilt into array
 if (typeof req.body.skills !== 'undefined') {
  profileFields.skills = req.body.skills.split(',');
 }

 // Social
 profileFields.social = {};
 if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
 if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
 if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
 if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
 if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


 Profile.findOne({
   user: req.user.id
  })
  .then(profile => {
   if (profile) {
    //Updated Profile
    Profile.findOneAndUpdate({
      user: req.user.id
     }, {
      $set: profileFields
     }, {
      new: true
     })
     .then(profile => res.json(profile))
     .catch(errors => res.status(404).json(errors))
   } else {
    //Creating New Profile
    /**
     * TODO : check if handle exist ? 
     */
    Profile.findOne({
      handle: profileFields.handle
     })
     .then(profile => {
      if (profile) {
       errors.handle = 'This handle already exist';
       return res.status(404).json(errors)
      } else {
       new Profile(profileFields).save()
        .then(profile => res.json(profile))
        .catch(errors => res.status(404).json(errors))
      }

     })
     .catch(errors => res.status(404).json(errors));
   }
  }).catch(errors => res.status(404).json(errors))
}

exports.createExpericenProfile = function(req,res){
  const {errors , isValid} = validateExperienceInput(req.body)
  if(!isValid){
     // Return any errors with 400 status
  return res.status(400).json(errors);
  }else{
    Profile.findOne({
      user:req.user.id
    }).then(profile=>{
      if(!profile){
        errors.profile = 'Profile does not exist';
        return res.status(404).json(errors)
      }
     else{
      const newExp = {
        title:req.body.title,
        company:req.body.company,
        location:req.body.location,
        from:req.body.from,
        to:req.body.to,
        current:req.body.current,
        description:req.body.description
      }
      //Add to exprience array
      profile.experience.unshift(newExp);
      profile.save().then(profile=>{
        return res.status(200).json(profile)
      }).catch(errors => res.status(404).json(errors))
     }
    }).catch(errors => res.status(404).json(errors))
  }
  
}

exports.createEducationProfile = function(req,res){
  const {errors, isValid } = validateEducationInput(req.body);
  if(!isValid){
    return res.status(400).json(errors)
  }else{
    Profile.findOne({user:req.user.id})
            .then(profile=>{
              if(!profile){
                errors.profile = 'Profile does not exist';
                return res.status(404).json(errors)
              }else{
                const newEducation = {
                  school:req.body.school,
                  degree:req.body.degree,
                  fieldofstudy:req.body.fieldofstudy,
                  from:req.body.from,
                  to:req.body.to,
                  current:req.body.current,
                  description:req.body.description,
                }
                profile.education.unshift(newEducation);
                profile.save()
                .then(profile=> res.status(200).json(profile))
                .catch(errors => res.status(404).json(errors))
              }
            }).catch(errors => res.status(404).json(errors))
  }
}