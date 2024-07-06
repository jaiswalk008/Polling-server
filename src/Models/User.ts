const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhotoURL:{
        type: String,
        default:process.env.PROFILE_PHOTO_URL
    }
    
})

export default mongoose.model('User', user);    