import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

import questionRoutes from "@/modules/question/question.routes";
import questionnaireJunctionRoutes from "@/modules/questionnaire-junction/questionnaire-junction.routes";
import questionnaireRoutes from "@/modules/questionnaire/questionnaire.routes";
import userQuestionnaireRoutes from "@/modules/user-questionnaire/user-questionnaire.routes";
import userRoutes from "@/modules/user/user.routes";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/questionnaire-junction", questionnaireJunctionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user-questionnaire", userQuestionnaireRoutes);

// Error handlers
app.use(errorHandler());

export { app, logger };
