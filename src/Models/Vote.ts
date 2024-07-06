import mongoose from "mongoose";
import { Schema } from "mongoose";

const voteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    optionId: {
        type: Schema.Types.ObjectId,
        ref: 'Option',
        required: true
    },
    pollId:{
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    }
});

const Vote = mongoose.model('Vote', voteSchema);

export default Vote;
