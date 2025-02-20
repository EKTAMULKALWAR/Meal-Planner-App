/* eslint-disable camelcase */
import express from 'express';
import { } from '../controllers/mealplan.js';
import { verifyUser } from '../middleware/authorization.js';

import {registerUser, loginUser, getUserById, updateUserPreferences} from '../controllers/user.js'
const router = express.Router();

// POST /users/register
router.post('/register', registerUser);

// POST /users/login
router.post('/login', loginUser);

// GET /users/:id
router.get('/:id', verifyUser, getUserById);

// PUT /users/:id
router.put('/:id/preferences', verifyUser, updateUserPreferences);

export default router;
