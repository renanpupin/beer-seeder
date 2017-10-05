import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';

const router = express.Router();

router.get('/', (req, res) =>
	res.json({success: true, message: "It works!"});
);

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;