import express from 'express';
import { verifyUser } from '../middleware/authorization.js';
import { searchForMeal } from '../controllers/meal.js';


const router = express.Router();

// GET /meals/search
router.get('/search', verifyUser, searchForMeal);

export default router;
