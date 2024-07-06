const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    pollId: {
        type: Schema.Types.ObjectId,
        ref: 'Poll', 
        required: true
    },
   
});

export default mongoose.model('Comment', commentSchema);
