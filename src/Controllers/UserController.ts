import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from '../Services/UserService';
import User from '../Models/User';
import * as S3service from '../Services/S3service';
import Poll from '../Models/Poll';
import Comment from '../Models/Comment';
/**
 * Controller class for handling user-related operations.
 * @class
 */
class UserController {
    /**
     * Generates a JWT token.
     * @param {number} id - The user ID.
     * @returns {string} The generated JWT token.
     */
    static generateToken(id: number): string {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in environment variables");
        }
        return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
    }

    /**
     * Handles user signup.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the new user or an error message.
     */
    static async signup(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            const existingUser = await UserService.getUser({ email });

            if (existingUser) {
                return res.status(409).json({ message: "Email already exists!" });
            }

            const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await UserService.createUser({ name, email, password: hashedPassword });

            return res.status(200).json(newUser);
        } catch (error:any) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!", error: error.message });
        }
    }

    /**
     * Handles user login.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with a success message and token or an error message.
     */
    static async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const existingUser: any = await UserService.getUser({ email });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found!" });
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                const token = UserController.generateToken(existingUser._id);
                return res.status(200).json({ message: 'Login Successful', userName: existingUser.name, token ,profilePhotoURL:existingUser.profilePhotoURL});
            } else {
                return res.status(401).json({ message: "Incorrect password!" });
            }
        } catch (error:any) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!", error: error.message });
        }
    }
    static async getUser(req: any, res: Response): Promise<Response> {
        try {
            const user = await UserService.getUser({ _id: req.user._id });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const polls = await Poll.find({ userId: req.user._id })
                .populate('options')
                .sort({ createdAt: -1 })
                .exec();
    
            const pollsWithComments = await Promise.all(polls.map(async (poll) => {
                const comments = await Comment.find({ pollId: poll._id })
                    .populate('userId', 'name')
                    .sort({ createdAt: -1 }) // Sort comments by creation date in descending order
                    .exec();
                
                const commentsWithUserNames = comments.map((comment:any )=> ({
                    ...comment.toObject(),
                    author: comment.userId.name // Add the name of the user who made the comment
                }));
    
                return {
                    ...poll.toObject(),
                    comments: commentsWithUserNames
                };
            }));
    
            return res.status(200).json({ name: user.name, email: user.email, polls: pollsWithComments });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!", error: error.message });
        }
    }
    static async updateProfilePhoto(req:any ,res:Response) : Promise<Response> {
        try {
            const file = req.files[0];
            console.log(file);
            
            const profilePhotoURL = await S3service.uploadToS3(file,file.originalname);
            
            await User.findByIdAndUpdate(req.user._id, { profilePhotoURL });
    
            res.status(200).json({ profilePhotoURL, status: true });
        } catch (error:any) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!", error: error.message });
        }
    }
}

export default UserController;
