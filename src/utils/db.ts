import mongoose from "mongoose";

import logger from "./logger";

const connect = async (): Promise<void> => {
	const dbUri = process.env.DATABASE_URL;

	try {
		mongoose.set("toJSON", { virtuals: true });
		mongoose.set("toObject", { virtuals: true });

		if (typeof dbUri !== "string") throw new Error("dbUri does not exist");

		await mongoose.connect(dbUri);

		logger.info("DB connected");
	} catch (error: unknown) {
		logger.error("Could not connect to db");
		process.exit(1);
	}
};

export default connect;
