"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    profilePhotoURL: {
        type: String,
        default: process.env.PROFILE_PHOTO_URL
    }
});
exports.default = mongoose.model('User', user);
