import mongoose from "mongoose"; 
import { Schema } from "mongoose";

const pollSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'Option'
    }],
   
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;