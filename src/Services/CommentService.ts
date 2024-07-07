import Comment from '../Models/Comment';

/**
 * Service class for handling comment-related operations.
 * @class
 */
class CommentService {
    /**
     * Creates a new comment.
     * @param {object} commentData - The data for the new comment.
     * @returns {Promise<object>} The created comment.
     */
    static async createComment(commentData: { content: string; pollId: string; userId: string }): Promise<any> {
        const newComment = new Comment(commentData);
        await newComment.save();
        return newComment;
    }

}

export default CommentService;
