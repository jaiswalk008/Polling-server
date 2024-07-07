import { Request, Response } from 'express';
import PollService from '../Services/PollService';

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
    static async createPoll(req: any, res: Response): Promise<Response> {
        try {
            const { question, options } = req.body;
            const poll = await PollService.createPoll({ userId: req.user._id, question, options });

            return res.status(201).json(poll);
        } catch (error: any) {
            console.error('Error creating poll:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Fetches all polls.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the list of polls or an error message.
     */
    static async getAllPolls(req: any, res: Response): Promise<Response> {
        try {
            const polls = await PollService.getAllPolls(req.user._id);
            return res.status(200).json(polls);
        } catch (error: any) {
            console.error('Error fetching polls:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Updates votes for a specific option.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with a success message or an error message.
     */
    static async updateVotes(req: any, res: Response): Promise<Response> {
        try {
            const { optionId, pollId } = req.body;
            await PollService.updateVotes(optionId, req.user._id, pollId);

            return res.status(200).json({ message: "Vote counted successfully" });
        } catch (error: any) {
            console.error('Error updating votes:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Fetches poll details by poll ID.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the poll details or an error message.
     */
    static async getPollDetails(req: Request, res: Response): Promise<Response> {
        try {
            const pollId = req.params.pollId;
            const pollDetails = await PollService.getPollDetails(pollId);

            return res.status(200).json(pollDetails);
        } catch (error: any) {
            console.error('Failed to fetch poll details:', error);
            return res.status(500).json({ message: 'Failed to fetch poll details', error: error.message });
        }
    }
}

export default PollController;
