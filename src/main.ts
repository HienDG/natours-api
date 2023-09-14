import { createServer, logger } from "./utils";

const port = process.env.PORT ?? 9999;

const startServer = (): void => {
	const app = createServer();

	const server = app.listen(port, () => {
		logger.info(`Server ready at http://localhost:${port}`);
	});

	const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
	signalTraps.forEach((type) => {
		process.once(type, () => {
			logger.info(`process.once ${type}`);

			server.close(() => {
				logger.debug("HTTP server closed");
			});
		});
	});
};

startServer();
