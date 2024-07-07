"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserService_1 = __importDefault(require("../Services/UserService"));
const S3service = __importStar(require("../Services/S3service"));
const Poll_1 = __importDefault(require("../Models/Poll"));
const Comment_1 = __importDefault(require("../Models/Comment"));
/**
 * Controller class for handling user-related operations.
 * @class
 */
class UserController {
    /**
     * Generates a JWT token.
     * @param {number} id - The user ID.
     * @returns {string} The generated JWT token.
     * @throws {Error} Throws an error if JWT_SECRET_KEY is not defined in environment variables.
     */
    static generateToken(id) {
        if (!process.env.JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in environment variables");
        }
        return jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_SECRET_KEY);
    }
    /**
     * Handles user signup.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the new user or an error message.
     */
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const existingUser = yield UserService_1.default.getUser({ email });
                if (existingUser) {
                    return res.status(409).json({ message: "Email already exists!" });
                }
                const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
                const newUser = yield UserService_1.default.createUser({ name, email, password: hashedPassword });
                return res.status(200).json(newUser);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Something went wrong!", error: error.message });
            }
        });
    }
    /**
     * Handles user login.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with a success message and token or an error message.
     */
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const existingUser = yield UserService_1.default.getUser({ email });
                if (!existingUser) {
                    return res.status(404).json({ message: "User not found!" });
                }
                const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
                if (passwordMatch) {
                    const token = UserController.generateToken(existingUser._id);
                    return res.status(200).json({ message: 'Login Successful', userName: existingUser.name, token, profilePhotoURL: existingUser.profilePhotoURL });
                }
                else {
                    return res.status(401).json({ message: "Incorrect password!" });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Something went wrong!", error: error.message });
            }
        });
    }
    /**
     * Retrieves user details along with their polls and comments.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with user details or an error message.
     */
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.getUser({ _id: req.user._id });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                const polls = yield Poll_1.default.find({ userId: req.user._id })
                    .populate('options')
                    .sort({ createdAt: -1 })
                    .exec();
                const pollsWithComments = yield Promise.all(polls.map((poll) => __awaiter(this, void 0, void 0, function* () {
                    const comments = yield Comment_1.default.find({ pollId: poll._id })
                        .populate('userId', 'name')
                        .sort({ createdAt: -1 })
                        .exec();
                    const commentsWithUserNames = comments.map((comment) => (Object.assign(Object.assign({}, comment.toObject()), { author: comment.userId.name })));
                    return Object.assign(Object.assign({}, poll.toObject()), { comments: commentsWithUserNames });
                })));
                return res.status(200).json({ name: user.name, email: user.email, polls: pollsWithComments });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Something went wrong!", error: error.message });
            }
        });
    }
    /**
     * Updates the profile photo of the user.
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<Response>} The response object with the updated profile photo URL or an error message.
     */
    static updateProfilePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.files[0];
                console.log(file);
                const profilePhotoURL = yield S3service.uploadToS3(file, file.originalname);
                yield UserService_1.default.updateUser(req.user._id, { profilePhotoURL });
                res.status(200).json({ profilePhotoURL, status: true });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Something went wrong!", error: error.message });
            }
        });
    }
}
exports.default = UserController;
