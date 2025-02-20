import MealPlan from '../models/Mealplan.js';

const verifyUserMealplan = async (req, res, next) => {
    try {
        const { user_id } = req.verified; 
        const { id } = req.params; 

    
        const mealPlan = await MealPlan.findById(id).select('user_id'); 
 

        if (!mealPlan) {
            return res.status(404).json({ error: 'Meal plan not found' });
        }

        if (mealPlan.user_id.toString() !== user_id) {
            return res.status(403).json({ error: 'Forbidden: You do not have access to this meal plan' });
        }

        req.mealPlan = mealPlan; 
        next();
    } catch (error) {
        console.error('Error in verifyUserMealplan Middleware:', error);
        res.status(500).json({ error: error.toString() });
    }
};

export default verifyUserMealplan;
