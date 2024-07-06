import { Router } from 'express'
import userRoutes from './UserRoutes'
import pollRoutes from './PollRoutes'
import commentRoutes from './CommentRoutes'
const app = Router();
app.use(userRoutes);
app.use('/poll',pollRoutes);
app.use('/comment',commentRoutes);
export default app;