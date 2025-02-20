<script>
    import { navigate } from 'svelte-routing';
    import axios from 'axios';

    let username = $state('');
    let password = $state('');
    let preferences = $state([]);
    let newPreference = $state('');
    let feedbackMessage = $state('');
    let formType = $state('login');

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

    const formConfig = {
        login: {
            title: 'Login',
            button_text: 'Login',
            toggle_text: 'No account? Register'
        },
        register: {
            title: 'Register',
            button_text: 'Register',
            toggle_text: 'Already have an account? Login'
        }
    };

    const formTypeToggle = () => {
        formType = formType === 'login' ? 'register' : 'login';
        feedbackMessage = '';
    };

    const addPreference = () => {
        if (preferences.includes(newPreference)) {
            feedbackMessage = `${newPreference} is already added.`;
            return;
        }
        preferences = [...preferences, newPreference];
        newPreference = '';
        feedbackMessage = ''; 

       
    };

    const removePreference = (index) => {
        preferences = preferences.filter((_, i) => i !== index);
    };



    const handleSubmit = async () => {
        if (!username || !password) {
            feedbackMessage = 'Username and password are required.';
            return;
        }

        const endpoint = `http://localhost:8080/users/${formType}`;
        const payload =
            formType === 'register'
                ? { username, password, preferences }
                : { username, password };

        try {
            const response = await axios.post(endpoint, payload);

            if (formType === 'login' && response.data._id) {
                const { _id, token_type, access_token, preferences } = response.data;
                const user = {
                    _id,
                    preferences,
                    header_token: `${token_type} ${access_token}`
                };
                localStorage.setItem('user', JSON.stringify(user));
                window.dispatchEvent(new Event('storage-updated'));
                navigate(`/profile/${_id}`);
            }

            if (formType === 'register' && response.data._id) {
                formTypeToggle();
            }

        } catch (error) {
            if (error.response?.status === 401) {
                feedbackMessage = 'Invalid username or password. Please try again.';
            } else if (error.response?.status === 409) {
                feedbackMessage = 'Username already exists. Please choose another.';
            } else if (error.response?.status === 400) {
            feedbackMessage = error.response?.data?.message || 'Invalid input. Please try again.';
            } else {
                feedbackMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            }
        }
    };
</script>

<div class="form-container">
    <h1>{formConfig[formType].title}</h1>

    <input type="text" bind:value={username} placeholder="Username" required />
    <input type="password" bind:value={password} placeholder="Password" required />

    {#if formType === 'register'}
    <div class="preferences-container">
        <label for="preferences">Select a Preference:</label>
        <select id="preferences" bind:value={newPreference}>
            <option value="" disabled selected>Select an option</option>
            {#each DIETS as diet}
                <option value={diet}>{diet}</option>
            {/each}
        </select>
        <button onclick={addPreference} disabled={!newPreference}>Add</button>
    
        {#if feedbackMessage}
    <p class="feedback-message error">{feedbackMessage}</p>
{/if}

    
        <ul>
            {#each preferences as preference, index}
                <li>
                    {preference}
                    <button onclick={() => removePreference(index)}>Remove</button>
                </li>
            {/each}
        </ul>
    </div>
    {/if}

    {#if feedbackMessage && formType !== 'register'}
    <p class="feedback-message error">{feedbackMessage}</p>
    {/if}

    <button class="submit-btn" onclick={handleSubmit}>
        {formConfig[formType].button_text}
    </button>

    <div class="toggle-container">
        <label for="toggle" class="toggle-label">
            {formConfig[formType].toggle_text}
        </label>
        <button
            class="toggle-btn"
            role="switch"
            aria-label="Toggle between login and register"
            aria-checked={formType === 'login' ? false : true}
            class:active={formType === 'login'}
            onclick={formTypeToggle}
        ></button>
    </div>
</div>



<style>
   
    .form-container {
        background-color: #1d2531;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 32rem;
        margin: 2.5rem auto;
        text-align: center;
    }

    .form-container h1 {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }

    .form-container input {
        width: 100%;
        padding: 1rem;
        margin: 1rem 0;
        border: none;
        border-radius: 0.5rem;
        background: #0f1621;
        color: #a0a0a0;
    }

    .form-container input:focus {
        outline: none;
        box-shadow: 0 0 0.3125rem #394961;
    }

    .form-container .submit-btn {
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 0.5rem;
        background: #f2c069;
        cursor: pointer;
        margin-bottom: 1rem;
    }

    .form-container .submit-btn:hover {
        background: #d9ac5e;
    }

   
    .preferences-container {
    margin: 1rem 0;
    text-align: left;
}

.preferences-container label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #d6dbe4;
}

.preferences-container select {
    width: calc(70% - 1rem);
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background: #0f1621;
    color: #a0a0a0;
}

.preferences-container select option {
    background: #0f1621;
    color: #a0a0a0;
}

.preferences-container button {
    background: #f2c069;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.preferences-container button:hover {
    background: #d9ac5e;
}

.preferences-container ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

.preferences-container li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    background: #0f1621;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: #a0a0a0;
}

   .feedback-message {
    font-size: 0.875rem;
    margin: -0.5rem 0 1rem 0;
   }

   .feedback-message.error {
    color: red;
   }

   
    .toggle-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .toggle-label {
        font-size: 1rem;
    }

    .toggle-btn {
        width: 3rem;
        height: 1.5rem;
        background-color: #555;
        border-radius: 1.875rem;
        position: relative;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        padding: 0;
        outline: none;
        border: none;
    }

    .toggle-btn:before {
        content: '';
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 1.25rem;
        height: 1.25rem;
        background-color: #d6dbe4;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .toggle-btn.active {
        background-color: #d9ac5e;
    }

    .toggle-btn.active:before {
        transform: translateX(1.5rem);
    }

    .toggle-btn:focus {
        outline: none;
        box-shadow: none;
    }
</style>
