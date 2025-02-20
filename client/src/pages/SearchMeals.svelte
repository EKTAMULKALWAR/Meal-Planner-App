<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import MealCard from '../components/MealCard.svelte';

    let mealName = '';
    let preference = '';
    let meals = [];
    let selectedWeek = 1;
    let mealPlans = [];
    let successMessage = '';
    let errorMessage = '';

    const preferencesList = [
        'gluten free',
        'dairy free',
        'vegan',
        'vegetarian',
        'ketogenic',
        'pescetarian',
        'primal',
        'paleolithic'
    ];

    const handleSearch = async () => {
        errorMessage = '';
        successMessage = '';
        meals = [];

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.header_token) {
            errorMessage = 'Unauthorized: Please log in.';
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8080/meals/search?name=${mealName}&preferences=${preference}`,
                { headers: { Authorization: user.header_token } }
            );
            meals = response.data;
        } catch (error) {
            errorMessage = 'Error fetching meals.';
            console.error(error);
        }
    };

    const addToMealPlan = async (meal) => {
    successMessage = '';
    errorMessage = '';

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.header_token) {
        errorMessage = 'Unauthorized: Please log in.';
        return;
    }

    try {
        const payload = {
            week: selectedWeek,
            meals: [
                {
                    mealId: meal.id, // Assuming meal.id is the correct identifier
                    name: meal.title, // The meal's title
                    image: meal.image // The meal's image URL
                }
            ]
        };

        const response = await axios.post(
            'http://localhost:8080/mealplans',
            payload,
            { headers: { Authorization: user.header_token } }
        );

        successMessage = `Meal "${meal.title}" added to Week ${selectedWeek}.`;
        fetchMealPlans();
    } catch (error) {
        errorMessage = error.response?.data?.error || 'Error adding meal to plan.';
        console.error(error);
    }
};


    const fetchMealPlans = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.header_token) return;

        try {
            const response = await axios.get('http://localhost:8080/mealplans', {
                headers: { Authorization: user.header_token }
            });
            mealPlans = response.data;
        } catch (error) {
            console.error('Error fetching meal plans:', error);
        }
    };

    const deleteMealPlan = async (mealPlanId) => {
        successMessage = '';
        errorMessage = '';

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.header_token) {
            errorMessage = 'Unauthorized: Please log in.';
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/mealplans/${mealPlanId}`, {
                headers: { Authorization: user.header_token }
            });
            successMessage = 'Meal plan deleted successfully.';
            fetchMealPlans();
        } catch (error) {
            errorMessage = error.response?.data?.error || 'Error deleting meal plan.';
            console.error(error);
        }
    };

    onMount(fetchMealPlans);
</script>

<div class="search-container">
    <h2>Search Meals</h2>
    <input
        type="text"
        placeholder="Enter meal name"
        bind:value={mealName}
    />
    <select bind:value={preference}>
        <option value="" disabled selected>Select preference (optional)</option>
        {#each preferencesList as diet}
            <option value={diet}>{diet}</option>
        {/each}
    </select>
    <button on:click={handleSearch}>Search</button>
</div>

{#if errorMessage}
    <p class="error-message">{errorMessage}</p>
{:else if successMessage}
    <p class="success-message">{successMessage}</p>
{/if}

<!-- Meal Search Results -->
<div class="results-container">
    {#if meals.length > 0}
        <h3>Search Results</h3>
        <label>
            Select Week:
            <input type="number" min="1" bind:value={selectedWeek} />
        </label>
        <div class="meals-list">
            {#each meals as meal}
                <div class="meal-item">
                    <p><strong>{meal.title}</strong></p>
                    <img src={meal.image} alt={meal.title} class="meal-image" />
                    <button on:click={() => addToMealPlan(meal)}>
                        Add to Week {selectedWeek}
                    </button>
                </div>
            {/each}
        </div>
    {:else}
        <p>No meals found. Try searching for something else.</p>
    {/if}
</div>

<!-- Meal Plans -->
<div class="meal-plans-container">
    <h2>Your Meal Plans</h2>
    {#if mealPlans.length > 0}
        <ul>
            {#each mealPlans as plan}
                <li>
                    <strong>Week {plan.week}</strong>
                    <button on:click={() => deleteMealPlan(plan._id)}>Delete</button>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No meal plans available.</p>
    {/if}
</div>

<style>
    .search-container, .meal-plans-container {
        margin-bottom: 1.5rem;
    }

    .results-container {
        margin-top: 1rem;
    }

    .meals-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }

    .meal-item {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
    }

    .meal-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 0.5rem 0;
    }

    button {
        background-color: #f2c069;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 0.5rem;
    }

    button:hover {
        background-color: #d9ac5e;
    }

    .error-message {
        color: red;
    }

    .success-message {
        color: green;
    }
</style>
