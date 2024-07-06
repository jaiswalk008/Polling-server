import { Router } from 'express'
import userRoutes from './UserRoutes'
import pollRoutes from './PollRoutes'
const app = Router();
app.use(userRoutes);
app.use('/poll',pollRoutes);
export default app;