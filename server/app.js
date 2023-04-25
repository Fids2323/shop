const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const dotenv = require("dotenv");
const chalk = require("chalk");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

async function start() {
	try {
		mongoose.connection.once("open", () => {
			initDatabase();
		});
		await mongoose.connect(process.env.MONGO_URL);
		console.log(chalk.green("MongoDB connected"));
		app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}`)));
	} catch (e) {
		console.log(chalk.red(e.message));
		process.exit(1);
	}
}

start();