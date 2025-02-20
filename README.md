# Meal Planner Application

A web-based application that helps users plan their meals by interacting with the [Spoonacular API](https://spoonacular.com/food-api). Users can generate daily or weekly meal plans based on dietary preferences, calorie targets, and excluded ingredients.

## Features

- **Meal Plan Generation**: Create daily or weekly meal plans tailored to user preferences.
- **Recipe Details**: View detailed information about each recipe, including ingredients, instructions, and nutritional information.
- **Shopping List**: Generate a shopping list based on the selected meal plan.
- **User Preferences**: Save dietary preferences and allergens for personalized meal suggestions.

## Technologies Used

- **Frontend**: Svelte
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External API**: Spoonacular API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4 or higher)
- [Spoonacular API Key](https://spoonacular.com/food-api)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/EKTAMULKALWAR/Meal-Planner-App.git
   cd Meal-Planner-App

Set Up Environment Variables:

Create a .env file in the root directory with the following content:

env
Copy
Edit
SPOONACULAR_API_KEY=your_spoonacular_api_key
MONGODB_URI=your_mongodb_connection_string
Install Dependencies:

For the backend:
cd server
npm install

For the frontend:
cd ../client
npm install

Running the Application

Start the Backend Server:
cd server
npm run dev
The backend server should now be running on http://localhost:8080/.

Start the Frontend Development Server:

In a new terminal window:
cd client
npm run dev
The frontend should now be running on http://localhost:5173/.

Usage
Sign Up / Log In: Create an account or log in to access personalized features.
Set Preferences: Update your dietary preferences and allergens in your profile.
Generate Meal Plan: Choose to generate a daily or weekly meal plan based on your preferences.
View Recipes: Click on any meal in your plan to view detailed recipes.
Shopping List: Generate a shopping list for your meal plan to assist with grocery shopping.
API Endpoints
GET /api/mealplan: Retrieve the user's current meal plan.
POST /api/mealplan: Generate a new meal plan based on user preferences.
GET /api/recipes/:id: Fetch detailed information about a specific recipe.
GET /api/shoppinglist: Retrieve the shopping list for the current meal plan.
Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Spoonacular API for providing extensive food and recipe data.
Svelte, Node.js, Express.js, and MongoDB for the development framework and database.

Feel free to customize this template to better fit the specifics of your project. Let me know if you need further assistance! 🚀
 
