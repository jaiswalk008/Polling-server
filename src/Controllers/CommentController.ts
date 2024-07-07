import { Request, Response } from 'express';
import CommentService from '../Services/CommentService';

/**
 * Controller class for handling comment-related operations.
 * @class
 */
class CommentController {
    /**
     * Creates a new comment.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the created comment or an error message.
     */
    static async createComment(req: any, res: Response): Promise<Response> {
        try {
            const { content, pollId } = req.body;
            const comment = await CommentService.createComment({ content, pollId, userId: req.user._id });

            return res.json(comment);
        } catch (error: any) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

   
}

export default CommentController;
