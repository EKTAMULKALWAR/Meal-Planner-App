import User from '../models/User.js';
import {hash, compare, signToken} from '../util/auth.js';

const registerUser = async(req, res) => {
    try {
        const { username, password, preferences = [] } = req.body;

        // require username and password
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password' });
        }
        const existingUser = await User.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const hashedPassword = await hash(password);

        const userEntry = await User.create({ 
            username, 
            password: hashedPassword, 
            preferences 
        });
        res.json({ 
            _id: userEntry._id,
            username: userEntry.username, 
            preferences: userEntry.preferences 
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body;

       
        if (!username || !password) {
            return res.status(422).json({ error: 'Must provide both username and password' });
        }

       
        const userEntry = await User.findOne({username: username.toLowerCase() });
        if (!userEntry) {
            return res.status(401).json({ error: 'Invalid username' });
        }
        const passwordEqual = await compare(password, userEntry.password);
        if(!passwordEqual){
            return res.status(401).json({error: 'Invalid password'})
        }

        const token = signToken(userEntry.username, userEntry._id);
        res.json({
            _id: userEntry._id,
             username: userEntry.username,
              preferences: userEntry.preferences,
              token_type: 'Bearer',
              access_token: token

            });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
const getUserById = async(req,res) => {
    try {
        const {user_id} = req.verified;
        const {id} = req.params;

        
        if (user_id !== id) {
            return res.status(403).json({ error: 'Forbidden user' });
        }

        // find the user by _id
        const userwithMealplan = await User.findById(id)
        .select('-password')
        .populate('mealplans');
        


        res.json(userwithMealplan);

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}
const updateUserPreferences = async (req, res) => {
    try {
        const { user_id } = req.verified; 
        const { id } = req.params; 
        const { preferences } = req.body; 

        
        if (user_id !== id) {
            return res.status(403).json({ error: 'Forbidden user' });
        }

       
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        
        user.preferences = preferences;

       
        await user.save();

        
        res.status(200).json({
            message: 'Preferences updated successfully.',
            preferences: user.preferences
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(400).json({ error: error.message });
    }
};


export {registerUser, loginUser, getUserById, updateUserPreferences};