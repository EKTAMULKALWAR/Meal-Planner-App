import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongodb from './db/connection.js';
import users from './api/routes/user.js';
import mealplans from './api/routes/mealplans.js';
import meals from './api/routes/meals.js';

const app = express();
const PORT = 8080;

const options = {exposedHandler : ['Authorization']};
app.use(cors(options));

app.use(express.json());

app.use('/users', users);
app.use('/mealplans', mealplans);
app.use('/meals', meals);

app.listen(PORT, async () => {
    // connecting to mongo db before starting the server
    await mongodb.connect();

    // log the server's URL and port to the console
    console.log(`Server is running on http://localhost:${PORT}`);
});
