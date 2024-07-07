import Poll from '../Models/Poll';
import Option from '../Models/Option';
import Vote from '../Models/Vote';
import Comment from '../Models/Comment';

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
    static async createPoll(pollData: { userId: string; question: string; options: { text: string, count: number }[] }): Promise<any> {
        const poll = await Poll.create({
            userId: pollData.userId,
            question: pollData.question,
            options: [],
        });

        const optionIds = await Promise.all(pollData.options.map(async (option) => {
            const createdOption = await Option.create({
                pollId: poll._id,
                text: option.text,
                count: option.count,
            });
            return createdOption._id;
        }));

        poll.options = optionIds;
        await poll.save();

        return poll;
    }

    /**
     * Fetches all polls.
     * @returns {Promise<object[]>} The list of polls.
     */
    static async getAllPolls(userId: string): Promise<any[]> {
        const polls = await Poll.find()
            .populate({
                path: 'userId',
                select: 'name profilePhotoURL',
            })
            .populate('options')
            .sort({ createdAt: -1 })
            .exec();

        const pollsWithDetails = await Promise.all(
            polls.map(async (poll) => {
                const userVote = await Vote.findOne({ userId, pollId: poll._id }).exec();
                const comments = await Comment.findOne({ pollId: poll._id })
                    .populate({
                        path: 'userId',
                        select: 'name',
                    })
                    .sort({ createdAt: -1 })
                    .exec();

                return {
                    ...poll.toObject(),
                    hasVoted: !!userVote,
                    comments: comments
                        ? [{
                            _id: comments._id,
                            author: comments.userId.name,
                            content: comments.content,
                            createdAt: comments.createdAt,
                        }]
                        : [],
                };
            })
        );

        return pollsWithDetails;
    }

    /**
     * Updates votes for a specific option.
     * @param {string} optionId - The ID of the option.
     * @param {string} userId - The ID of the user.
     * @param {string} pollId - The ID of the poll.
     * @returns {Promise<void>} A promise indicating the result of the operation.
     */
    static async updateVotes(optionId: string, userId: string, pollId: string): Promise<void> {
        const option = await Option.findById(optionId);
        if (!option) {
            throw new Error("Option not found");
        }

        option.count++;
        const newVote = new Vote({ optionId, userId, pollId });
        await newVote.save();
        await option.save();
    }

    /**
     * Fetches poll details by poll ID.
     * @param {string} pollId - The ID of the poll.
     * @returns {Promise<object>} The poll details.
     */
    static async getPollDetails(pollId: string): Promise<any> {
        const poll = await Poll.findById(pollId)
            .populate({
                path: 'userId',
                select: 'name profilePhotoURL',
            })
            .populate('options')
            .exec();

        if (!poll) {
            throw new Error('Poll not found');
        }

        const comments = await Comment.find({ pollId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .exec();

        const commentsWithUserDetails = comments.map((comment: any) => ({
            ...comment.toObject(),
            author: comment.userId.name,
        }));

        return { poll, comments: commentsWithUserDetails };
    }
}

export default PollService;
