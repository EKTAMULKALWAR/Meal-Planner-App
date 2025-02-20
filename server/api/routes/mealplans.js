import express from 'express';
import { verifyUser } from '../middleware/authorization.js';
import {createOrUpdateMealPlan, deleteMealPlan} from '../controllers/mealplan.js';
import verifyUserMealplan from '../middleware/validation.js';



const router = express.Router();


router.post('/',verifyUser, createOrUpdateMealPlan );

router.delete('/:id',verifyUser, verifyUserMealplan, deleteMealPlan);

export default router;
