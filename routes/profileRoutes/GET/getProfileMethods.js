const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const postMessage = require('../../utils/postMessage')


exports.currentProfile = function(req, res){
    const errors={}
    Profile.findOne({user:req.user.id})
            .then(profile=>{
                debugger;
                if(!profile){
                    errors.profile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                else{
                    return res.json(profile);
                }
            })
            .catch(errors=> res.status(404).json(errors))
};