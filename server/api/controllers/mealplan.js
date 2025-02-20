import MealPlan from '../models/Mealplan.js';


const MAX_MEALS = 3;


 const createOrUpdateMealPlan = async (req, res) => {
    try {
       
        const { user_id } = req.verified;
        const { week, meals } = req.body;


        let mealPlan = await MealPlan.findOne({ user_id, week });
        if (mealPlan) {

            if (mealPlan.meals.length + meals.length > MAX_MEALS) {
                return res.status(400).json({
                    error: `Meal plan cannot exceed ${MAX_MEALS} meals.`
                });
            }

            mealPlan.meals.push(...meals);
            await mealPlan.save();
            return res.status(200).json(mealPlan);
        }

        mealPlan = await MealPlan.create({ user_id, week, meals });
        res.status(201).json(mealPlan);
    } catch (error) {
        console.error('Error in createOrUpdateMealPlan:', error);
        res.status(500).json({ error: error.message });
    }
};
const deleteMealPlan = async (req, res) => {
    try {
        const { user_id } = req.verified; 
        const { id } = req.params; 

       const mealPlan = await MealPlan.findOneAndDelete({
            _id: id,
            user_id
        });

        if (!mealPlan) {
            return res.status(404).json({ error: 'Meal plan not found or unauthorized.' });
        }

        res.status(200).json({ _id: id, message: 'Meal plan deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteMealPlan:', error);
        res.status(500).json({ error: error.message });
    }
};



export {createOrUpdateMealPlan, deleteMealPlan};