import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const createServer = (): Application => {
	const app = express();

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		app.use(morgan("dev"));
	}

	app.use(cors());

	return app;
};

export default createServer;
