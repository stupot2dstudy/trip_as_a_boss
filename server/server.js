// server.js

import express from 'express';
import bodyParser from 'body-parser';
import { initializeDatabase } from './db/db_init.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import registerRoute from './routes/registerRoute.js';
import successRoute from './routes/successRoute.js';
import protectedResourceRoute from './routes/protectedResourceRoute.js';
import loginRoute from './routes/loginRoute.js';
import { authenticationMiddleware } from './middlewares/authenticationMiddleware.js';
import config from './config.js';
import recommendationRouter from './routes/recommendationsRouter.js'; // Import the recommendation router
//import fileUploadRoute from './routes/fileUploadRoute.js'; // Import the fileUploadRoute IN PROGRESS

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(registerRoute);
app.use(loginRoute);
app.use(successRoute);
app.use(protectedResourceRoute);
// Use the recommendation router
app.use(recommendationRouter);
//app.use(fileUploadRoute); //IN PROGRESS


app.use(notFoundMiddleware);

initializeDatabase();

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
