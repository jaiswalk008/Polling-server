"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const voteSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    optionId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Option',
        required: true
    },
    pollId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    }
});
const Vote = mongoose_1.default.model('Vote', voteSchema);
exports.default = Vote;
