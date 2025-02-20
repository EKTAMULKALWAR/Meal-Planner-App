<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import MealCard from '../components/MealCard.svelte';

   
    let { id } = $props();


    let profile = $state(null);

    let errorMessage = $state('');

    onMount(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user || !user.header_token) {
            errorMessage = 'Unauthorized: No valid token found. Please log in.';
            return; 
        }

            
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    Authorization: user.header_token 
                }
            });

            profile = response.data;
        } catch (error) {
            console.error('API Call Failed:', error.response || error.message);
            errorMessage =
                error.response?.data?.error || 'Failed to load profile. Please try again later.';
        }
    });
</script>

<div class="profile-container">
    {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
    {:else if !profile}
        <div>Loading profile...</div>
    {:else}
        <h1>Welcome, {profile.username}!</h1>
        <p><strong>Preferences:</strong>
            {#if profile.preferences && profile.preferences.length > 0}
                {profile.preferences.join(', ')}
            {:else}
                None
            {/if}
        </p>
                <hr />
        <h2>Meal Plans</h2>
        <div class="mealplans">
            {#if !profile.mealplans || profile.mealplans.length === 0}
                <p>No meal plans available.</p>
            {:else}
                {#each profile.mealplans as mealplan}
                    <div class="mealplan">
                        <h3>Week {mealplan.week}</h3>
                        <MealCard meals={mealplan.meals} />
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .profile-container {
        margin: 2rem auto;
        padding: 2rem;
        text-align: left;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }

    h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.25rem;
        margin-top: 1rem;
    }

    .mealplans {
        margin-top: 1.5rem;
    }

    .error-message {
        color: red;
        font-weight: bold;
    }
</style>
