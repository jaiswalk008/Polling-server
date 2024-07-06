import { Router } from 'express'
import userRoutes from './UserRoutes'
const app = Router();
app.use(userRoutes);
export default app;