const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
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
        ref: 'Poll', // Reference to the Poll model
        required: true
    },
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

export default mongoose.model('Comment', commentSchema);
