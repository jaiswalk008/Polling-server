"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const pollSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    options: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Option'
        }],
});
const Poll = mongoose_1.default.model('Poll', pollSchema);
exports.default = Poll;
