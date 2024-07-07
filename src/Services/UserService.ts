import { UserInterface } from "../Interfaces/user.interface";
import User from "../Models/User"

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
    static async getUser(condition: any = {}): Promise<InstanceType<typeof User> | null> {
        
        try {
            return  User.findOne(condition);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Creates a new user with the provided user data.
     * @param {UserInterface} userData - Data for the new user.
     * @returns {Promise<InstanceType<typeof User>>} A promise that resolves to the created user.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    static async createUser(userData: UserInterface): Promise<InstanceType<typeof User>> {

        try {
            const newUser = new User(userData)
            await newUser.save()
            return newUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    /**
     * Updates a user based on the provided user ID and update data.
     * @param {string} userId - The ID of the user to be updated.
     * @param {object} updateData - Data to update the user with.
     * @returns {Promise<InstanceType<typeof User> | null>} A promise that resolves to the updated user or null if not found.
     * @throws {Error} Throws an error if there's an issue with the database operation.
     */
    static async updateUser(userId: string, updateData: any): Promise<InstanceType<typeof User> | null> {
        try {
            return User.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default UserService;
