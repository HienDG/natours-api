import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { userRoute } from "../routes";

dotenv.config();

const createServer = (): Application => {
	const app = express();

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		app.use(morgan("dev"));
	}
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(express.json());

	app.use("/api/v1/users", userRoute);

	return app;
};

export default createServer;
