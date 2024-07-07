"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const optionSchema = new mongoose_2.Schema({
    pollId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});
const Option = mongoose_1.default.model('Option', optionSchema);
exports.default = Option;
