const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const postMessage = require('../../utils/postMessage')

/**
 * Mongo DB Methods
 * findOne : finds document based on user id
 * populate : used to read other collection data 
 * find : fetches more than one record
 */
exports.currentProfile = function(req, res) {
    const errors = {}
    Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.profile = 'There is no profile for this user';
                return res.status(404).json(errors);
            } else {
                return res.json(profile);
            }
        })
        .catch(errors => res.status(404).json(errors))
};

exports.currentHandle = function(req,res){
    //Note here we are reading unique id from params
    let errors={}
    Profile.findOne({handle:req.params.handle})
            .populate('user', ['name', 'avatar'])
            .then(profile=>{
                if(!profile){
                    errors.profile = 'There is no profile for this handle';
                }else{
                    return res.json(profile);
                }
            })
            .catch(errors => res.status(404).json(errors))
}

exports.currentUser = function(req,res){
    //Note here we are reading unique id from params
    let errors={}
    Profile.findOne({user:2332434})
            .populate('user', ['name', 'avatar'])
            .then(profile=>{
                if(!profile){
                    errors.profile = 'There is no profile for this user';
                }else{
                    return res.json(profile);
                }
            })
            .catch(errors => res.status(404).json({profile:'There is no profile for this user'}))
}

exports.currentProfiles = function(req,res){
    //Note here we are reading unique id from params
    let errors={}
    Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profile=>{
                if(!profile){
                    errors.profile = 'There are no profiles';
                }else{
                    return res.json(profile);
                }
            })
            .catch(errors => res.status(404).json({profile:'There are no profiles'}))
}


