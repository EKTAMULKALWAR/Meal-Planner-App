import User from '../models/User.js';
import axios from 'axios';

const searchForMeal = async (req, res) => {
    try {
        const { user_id } = req.verified;
        const { name, preferences } = req.query;

        
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       
        const queryPreferences = preferences ? preferences.split(',') : [];
        const diet = [...user.preferences, ...queryPreferences].join(',');

        
        const response = await axios.get(`${process.env.SPOON_API_URL}/complexSearch`, {
            params: {
                apiKey: process.env.SPOON_API_KEY,
                query: name,
                diet,
                addRecipeInformation: true 
            },
        });

        res.json(response.data.results);
    } catch (error) {
        console.error('Error in searchForMeal:', error);
        res.status(500).json({ error: error.toString() });
    }
};

export { searchForMeal };
