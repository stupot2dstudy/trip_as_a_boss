// protectedResourceRoute.js

import express from 'express';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/protected-resource', authenticationMiddleware, (req, res) => {
    res.json({ message: 'This is a protected resource.' });
});

export default router;
