import { Router } from "express";
import UserController from '../Controllers/UserController';
import authenticateMiddleware from "../Middleware/AuthMiddleware";
import multer from 'multer';
const storage = multer.memoryStorage();
const uploads = multer({storage});
const router = Router();

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);
router.get('/',authenticateMiddleware,UserController.getUser);
router.post('/profilePhoto',authenticateMiddleware,uploads.array("profilePhoto"),UserController.updateProfilePhoto)
export default router;