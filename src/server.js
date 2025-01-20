import cookieParser from 'cookie-parser';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

import express from "express";
import cors from "cors";

import { env } from "./utils/env.js";
import router from "./routers/index.js";

import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    //app.use(logger);
    app.use(cookieParser());

    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

    app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));

    app.listen(port, () => console.log(`Server running on port ${port}`));
};