import dotenv from "dotenv";

import express from "express";
import chalk from "chalk";
// Routes
import authRoute from "./routes/auth";

dotenv.config();

const app = express();

app.set("view-engin", "ejs");

app.use(express.static("public"));

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
