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
const Comment_1 = __importDefault(require("../Models/Comment"));
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
    static createComment(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = new Comment_1.default(commentData);
            yield newComment.save();
            return newComment;
        });
    }
}
exports.default = CommentService;
