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
const User_1 = __importDefault(require("../Models/User"));
/**
 * Service class for handling User-related operations.
 * @class
 */
class UserService {
    /**
     * Retrieves a user based on the provided condition.
     * @param {object} condition - Conditions to filter the user.
     * @returns {Promise<InstanceType<typeof User> | null>} A promise that resolves to the found user or null if not found.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    static getUser(condition = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return User_1.default.findOne(condition);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * Creates a new user with the provided user data.
     * @param {UserInterface} userData - Data for the new user.
     * @returns {Promise<InstanceType<typeof User>>} A promise that resolves to the created user.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User_1.default(userData);
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    /**
     * Updates a user based on the provided user ID and update data.
     * @param {string} userId - The ID of the user to be updated.
     * @param {object} updateData - Data to update the user with.
     * @returns {Promise<InstanceType<typeof User> | null>} A promise that resolves to the updated user or null if not found.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    static updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return User_1.default.findByIdAndUpdate(userId, updateData, { new: true });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = UserService;
