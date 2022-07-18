if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import createServer from "./utils/server";
import chalk from "chalk";

import passport from "passport";
import { initialize } from "./utils/passportConfig";
// Routes
import authRoute from "./routes/auth";
import dashboardRouter from "./routes/dashboard";

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
app.use("/dashboard", dashboardRouter);

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
