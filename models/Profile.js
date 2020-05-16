const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Created Schema for Profile

/**
 * Fields Included in PROFILE
 * user -> Collection
 * handle ->string
 * company ->string
 * website -> string
 * locatiom ->string
 * status -> string
 * skills ->  [string]
 * bio ->string
 * githubusername->string
 * ------->experience------<
 *      title
 *      company
 *      location
 *      from
 *      to
 *      current
 *      description
 * ------->experience------<
 * ------->education------<
 *      school
 *      degree
 *      fieldOfStudy
 *      from 
 *      to
 *      current
 *      description
 * ------->education------<
 * ------->social------<
 *      youtube
 *      twitter
 *      facebook
 *      instagram
 *      linkedin
 * ------->social------<
 * date - Date
*/

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
