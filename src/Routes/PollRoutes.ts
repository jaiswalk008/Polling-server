import { Router } from "express";
import PollController from "../Controllers/PollController";
import authenticateMiddleware from "../Middleware/AuthMiddleware";
const router = Router();
router.post('',authenticateMiddleware,PollController.createPoll)
router.get('',authenticateMiddleware, PollController.getAllPolls);
router.get('/:pollId', PollController.getPollDetails);
router.patch('',authenticateMiddleware,PollController.updateVotes);
export default router;