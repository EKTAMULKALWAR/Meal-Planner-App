<script>
   
     export let meals = [];

</script>

<div class="meal-card-container">
    {#if meals.length === 0}
        <p>No meals available for this week.</p>
    {:else}
        {#each meals as meal}
            <div class="meal-card">
                <img class="meal-image" src={meal.image} alt={meal.name} />
                <div class="meal-info">
                    <p class="meal-title">{meal.name}</p>
                    <p class="meal-diets">
                        {#if meal.diets.length > 0}
                            {meal.diets.join(', ')}
                        {:else}
                            No dietary information in your cart. 
                        {/if}
                    </p>
                </div>
            </div>
        {/each}
    {/if}
</div>

<style>
    .meal-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .meal-card {
        background-color: #1d2531;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease-in-out;
    }

    .meal-card:hover {
        transform: scale(1.05);
    }

    .meal-image {
        width: 100%;
        height: 200px;
        border-radius: 8px;
        object-fit: cover;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .meal-info {
        text-align: center;
    }

    .meal-title {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        margin: 0.5rem 0;
        color: #ffffff;
    }

    .meal-diets {
        color: #a8b9b7;
        margin: 0.3rem 0;
        font-size: 0.9rem;
    }
</style>
