import express from "express";
import logger from "morgan";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";

function server() {
	const app = express();

	app.set("view-engin", "ejs");

	app.use(express.static("public"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger("dev"));
	app.use(flash());
	app.use(
		session({
			secret: process.env.SESSION_SECRET_KEY as string,
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	return app;
}

export default server;
