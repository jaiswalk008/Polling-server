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
const Poll_1 = __importDefault(require("../Models/Poll"));
const Option_1 = __importDefault(require("../Models/Option"));
const Vote_1 = __importDefault(require("../Models/Vote"));
const Comment_1 = __importDefault(require("../Models/Comment"));
/**
 * Service class for handling poll-related operations.
 * @class
 */
class PollService {
    /**
     * Creates a new poll with the provided data.
     * @param {object} pollData - The data for the new poll.
     * @returns {Promise<object>} The created poll.
     */
    static createPoll(pollData) {
        return __awaiter(this, void 0, void 0, function* () {
            const poll = yield Poll_1.default.create({
                userId: pollData.userId,
                question: pollData.question,
                options: [],
            });
            const optionIds = yield Promise.all(pollData.options.map((option) => __awaiter(this, void 0, void 0, function* () {
                const createdOption = yield Option_1.default.create({
                    pollId: poll._id,
                    text: option.text,
                    count: option.count,
                });
                return createdOption._id;
            })));
            poll.options = optionIds;
            yield poll.save();
            return poll;
        });
    }
    /**
     * Fetches all polls.
     * @returns {Promise<object[]>} The list of polls.
     */
    static getAllPolls(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const polls = yield Poll_1.default.find()
                .populate({
                path: 'userId',
                select: 'name profilePhotoURL',
            })
                .populate('options')
                .sort({ createdAt: -1 })
                .exec();
            const pollsWithDetails = yield Promise.all(polls.map((poll) => __awaiter(this, void 0, void 0, function* () {
                const userVote = yield Vote_1.default.findOne({ userId, pollId: poll._id }).exec();
                const comments = yield Comment_1.default.findOne({ pollId: poll._id })
                    .populate({
                    path: 'userId',
                    select: 'name',
                })
                    .sort({ createdAt: -1 })
                    .exec();
                return Object.assign(Object.assign({}, poll.toObject()), { hasVoted: !!userVote, comments: comments
                        ? [{
                                _id: comments._id,
                                author: comments.userId.name,
                                content: comments.content,
                                createdAt: comments.createdAt,
                            }]
                        : [] });
            })));
            return pollsWithDetails;
        });
    }
    /**
     * Updates votes for a specific option.
     * @param {string} optionId - The ID of the option.
     * @param {string} userId - The ID of the user.
     * @param {string} pollId - The ID of the poll.
     * @returns {Promise<void>} A promise indicating the result of the operation.
     */
    static updateVotes(optionId, userId, pollId) {
        return __awaiter(this, void 0, void 0, function* () {
            const option = yield Option_1.default.findById(optionId);
            if (!option) {
                throw new Error("Option not found");
            }
            option.count++;
            const newVote = new Vote_1.default({ optionId, userId, pollId });
            yield newVote.save();
            yield option.save();
        });
    }
    /**
     * Fetches poll details by poll ID.
     * @param {string} pollId - The ID of the poll.
     * @returns {Promise<object>} The poll details.
     */
    static getPollDetails(pollId) {
        return __awaiter(this, void 0, void 0, function* () {
            const poll = yield Poll_1.default.findById(pollId)
                .populate({
                path: 'userId',
                select: 'name profilePhotoURL',
            })
                .populate('options')
                .exec();
            if (!poll) {
                throw new Error('Poll not found');
            }
            const comments = yield Comment_1.default.find({ pollId })
                .populate('userId', 'name')
                .sort({ createdAt: -1 })
                .exec();
            const commentsWithUserDetails = comments.map((comment) => (Object.assign(Object.assign({}, comment.toObject()), { author: comment.userId.name })));
            return { poll, comments: commentsWithUserDetails };
        });
    }
}
exports.default = PollService;
