import mongoose from 'mongoose';

const DIETS = [
    'gluten free',
    'dairy free',
    'vegan',
    'vegetarian',
    'ketogenic',
    'pescetarian',
    'primal',
    'paleolithic'
];

const validatePreferences = (preferences) => {
    return preferences.filter((preference) => !DIETS.includes(preference.toLowerCase()));
};

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        preferences: {
            type: [String],
            required: true,
            default: []
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// virtual to populate the associated mealplans for the user
UserSchema.virtual('mealplans', {
    ref: 'MealPlan',
    localField: '_id',
    foreignField: 'user_id'
});

UserSchema.pre('save', function (next) {
    const user = this;

    
    if (!user.preferences || user.preferences.length === 0) {
        return next();
    }

    const invalidPreferences = validatePreferences(user.preferences);
    
    if (invalidPreferences.length > 0) {
        const error = new Error(
            `Invalid dietary preferences: ${invalidPreferences.join(', ')}`
        );
        return next(error); 
    }

    next(); 
});

const User = mongoose.model('User', UserSchema);

export default User;
