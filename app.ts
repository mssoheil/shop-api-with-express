if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import createServer from "./utils/server";
import chalk from "chalk";

import passport from "passport";
import { initialize } from "./utils/passportConfig";
// Routes
import authRoute from "./routes/auth";

initialize(passport);

const app = createServer();

app.get("/", (req, res) => {
	res.redirect("/auth/login");
});

app.use("/auth", authRoute);

app.get("/dashboard", (req, res) => {
	res.render("dashboard.ejs");
});

app.get("/register", (req, res) => {
	res.render("register.ejs");
});

const port = process.env.PORT;

app.listen(process.env.PORT, () => {
	console.log(chalk.cyan(`listening on port ${port}...`));
});

export default app;
