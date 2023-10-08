// successRoute.js

import express from 'express';
import { dirname } from 'path';

const router = express.Router();
const __dirname = dirname(import.meta.url);

router.get('/success', (req, res) => {
    res.sendFile(`${__dirname}/success.html`);
});

export default router;
