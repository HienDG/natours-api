import { createServer, logger, connect } from "./utils";

const port = process.env.PORT ?? 9999;

const startServer = (): void => {
	const app = createServer();
	const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];

	const server = app.listen(port, async () => {
		await connect();

		logger.info(`Server ready at http://localhost:${port}`);
	});

	signalTraps.forEach((type) => {
		process.once(type, () => {
			logger.info(`process.once ${type}`);

			server.close(() => {
				logger.error("HTTP server closed");
			});
		});
	});
};

startServer();
