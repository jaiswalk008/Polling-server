import { Router } from "express";
import authenticateMiddleware from "../Middleware/AuthMiddleware";
import  CommentController from '../Controllers/CommentController'
const router = Router();
router.post('/',authenticateMiddleware , CommentController.createComment )

export default router;
