<script>
    import { Router, Link, Route, navigate } from 'svelte-routing';
    import LoginRegister from './pages/LoginRegister.svelte';
    import Profile from './pages/Profile.svelte';
    import SearchMeals from './pages/SearchMeals.svelte';

    // Retrieve user data from local storage
    let user = JSON.parse(localStorage.getItem('user')) || null;

    // Logout Functionality
    const logout = () => {
        localStorage.removeItem('user'); // Clear user data
        user = null; // Reset user state
        navigate('/account'); // Navigate to login/register page
    };

    // Listen for login/logout state updates from localStorage
    window.addEventListener('storage-updated', () => {
        user = JSON.parse(localStorage.getItem('user')) || null;
    });
</script>

<div class="app-container">
    <Router>
        <!-- Navigation Bar -->
        <nav class="navbar">
            <div class="navbar-brand">
                <h1>Meal Planner App</h1>
            </div>

            <div class="navbar-links">
                {#if user}
                    <!-- Authenticated Links -->
                    <Link to="/profile/{user._id}" class="nav-item">Profile</Link>
                    <Link to="/search" class="nav-item">Search Meals</Link>
                    <button class="logout-btn" on:click={logout}>Logout</button>
                {:else}
                    <!-- Login/Register Link -->
                    <Link to="/account" class="nav-item">Login</Link>
                {/if}
            </div>
        </nav>

        <!-- Application Routes -->
        <div class="content">
            <Route path="/account">
                <LoginRegister />
            </Route>
            <Route path="/profile/:id" let:params>
                <Profile id={params.id} />
            </Route>
            <Route path="/search">
                <SearchMeals />
            </Route>
        </div>
    </Router>
</div>

<style>
    /* App Container */
    .app-container {
        font-family: 'Montserrat', sans-serif;
        background-color: #0c111a;
        color: #d6dbe4;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    /* Navbar Styles */
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #1d2531;
        border-bottom: 2px solid #00001a;
    }

    .navbar-brand h1 {
        font-size: 1.8rem;
        margin: 0;
    }

    .navbar-links {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .nav-item {
        text-decoration: none;
        color: #f2c069;
        text-transform: uppercase;
        font-weight: bold;
    }

    .logout-btn {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #f2c069;
        color: #1d2531;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        transition: background 0.3s ease;
    }

    .logout-btn:hover {
        background-color: #d9ac5e;
    }

    /* Content Area */
    .content {
        padding: 2rem;
        flex: 1;
        overflow-y: auto;
    }
</style>
