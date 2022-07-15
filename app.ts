if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import createServer from "./utils/server";
import chalk from "chalk";

import passport from "passport";
import { initialize } from "./utils/passportConfig";
// Routes
import authRoute from "./routes/auth";
import { getUserById, getUsers } from "./utils/getSetUsers";

async function handleGetById(id: string) {
	const users = await getUsers();
	const user = await getUserById(users, id);
	return user;
}

initialize(passport, handleGetById);

const app = createServer();

app.get("/", (req, res) => {
	res.redirect("/auth/login");
});

app.use("/auth", authRoute);

app.get("/dashboard", (req, res) => {
	// @ts-ignore
	if (!req?.user?.email) {
		return res.redirect("/auth/login");
	}
	// @ts-ignore
	res.render("dashboard.ejs", { email: req.user.email, role: req.user.role });
});

app.post("/logout", (req, res) => {
	req.logOut(
		{
			keepSessionInfo: false,
		},
		(error: any) => {
			console.log("DEBUG -> app.post -> error", error);
		},
	);
	res.redirect("/auth/login");
});

const port = process.env.PORT;

app.listen(process.env.PORT, () => {
	console.log(chalk.cyan(`listening on port ${port}...`));
});

export default app;
