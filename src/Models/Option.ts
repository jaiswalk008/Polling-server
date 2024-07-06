import mongoose from "mongoose"; 
import { Schema } from "mongoose";

const optionSchema = new Schema({
    pollId: {
        type: Schema.Types.ObjectId,
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

const Option = mongoose.model('Option', optionSchema);

export default Option;