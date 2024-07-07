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
const PollService_1 = __importDefault(require("../Services/PollService"));
/**
 * Controller class for handling poll-related operations.
 * @class
 */
class PollController {
    /**
     * Creates a new poll.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the created poll or an error message.
     */
    static createPoll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { question, options } = req.body;
                const poll = yield PollService_1.default.createPoll({ userId: req.user._id, question, options });
                return res.status(201).json(poll);
            }
            catch (error) {
                console.error('Error creating poll:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Fetches all polls.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the list of polls or an error message.
     */
    static getAllPolls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const polls = yield PollService_1.default.getAllPolls(req.user._id);
                return res.status(200).json(polls);
            }
            catch (error) {
                console.error('Error fetching polls:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Updates votes for a specific option.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with a success message or an error message.
     */
    static updateVotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { optionId, pollId } = req.body;
                yield PollService_1.default.updateVotes(optionId, req.user._id, pollId);
                return res.status(200).json({ message: "Vote counted successfully" });
            }
            catch (error) {
                console.error('Error updating votes:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Fetches poll details by poll ID.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the poll details or an error message.
     */
    static getPollDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pollId = req.params.pollId;
                const pollDetails = yield PollService_1.default.getPollDetails(pollId);
                return res.status(200).json(pollDetails);
            }
            catch (error) {
                console.error('Failed to fetch poll details:', error);
                return res.status(500).json({ message: 'Failed to fetch poll details', error: error.message });
            }
        });
    }
}
exports.default = PollController;
