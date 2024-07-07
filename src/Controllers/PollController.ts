import { Request, Response } from 'express';
import Poll from '../Models/Poll'
import Option from '../Models/Option' 
import Vote from '../Models/Vote';
import Comment from '../Models/Comment';


export const createPoll = async (req: any, res: Response) => {
    try {
        const { question, options } = req.body;

        console.log(options)
        const poll = await Poll.create({
            userId: req.user._id,
            question,
            options: [],
           
        });

        // Create options for the poll
        const optionIds = await Promise.all(options.map(async (option: { text: string, count: number }) => {
            const createdOption = await Option.create({
                pollId: poll._id,
                text: option.text,
                count: option.count
            });
            return createdOption;
        }));

        // Update poll with option IDs
        poll.options = optionIds;
        await poll.save();
        console.log(poll);
        res.status(201).json(poll);
    } catch (error) {
        console.error('Error creating poll:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllPolls = async (req: any, res: Response) => {
    try {
      // Fetch all polls and populate options and user info
      const polls = await Poll.find()
        .populate({
          path: 'userId',
          select: 'name profilePhotoURL',
        })
        .populate('options')
        .sort({ createdAt: -1 })
        .exec();
  
      // Get the user ID from the request
      const userId = req.user._id;
  
      // Check if the user has voted for each poll and fetch the latest comment
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
  
      res.status(200).json(pollsWithDetails);
    } catch (error) {
      console.error('Error fetching polls:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const updateVotes = async (req:any , res:Response) =>{
    try {
        const {optionId,pollId} = req.body
        const option = await Option.findById(optionId)
        if(!option){
            return res.status(404).json({error:"Option not found"})
        }
        option.count++;
        const newVote = new Vote({optionId,userId:req.user._id,pollId});
        await newVote.save();   
        await option.save()
        res.status(200).json({message:"Vote counted successfully"})
    } catch (error) {
        console.error('Error updating votes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getPollDetails = async (req: Request, res: Response) => {
  const pollId = req.params.pollId;

  try {
      // Fetch poll details including options
      const poll = await Poll.findById(pollId)
      .populate({
        path: 'userId',
        select: 'name profilePhotoURL',
      })
      .populate('options')
      .exec();

      if (!poll) {
          return res.status(404).json({ message: 'Poll not found' });
      }

      const comments = await Comment.find({ pollId })
          .populate('userId', 'name')
          .sort({ createdAt: -1 }) // 
          .exec();

      const commentsWithUserDetails = comments.map((comment: any) => ({
          ...comment.toObject(),
          author: comment.userId.name,
              
      }));

      return res.status(200).json({ poll, comments: commentsWithUserDetails });
  } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch poll details', error: error.message });
  }
};