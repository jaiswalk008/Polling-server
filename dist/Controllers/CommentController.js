"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommentService_1 = __importDefault(require("../Services/CommentService"));
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
    static createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, pollId } = req.body;
                const comment = yield CommentService_1.default.createComment({ content, pollId, userId: req.user._id });
                return res.json(comment);
            }
            catch (error) {
                console.error('Error creating comment:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = CommentController;
