import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findByKey } from "./findBykey";
import { getUsers } from "./getSetUsers";
// Types
import type { User } from "../types/user";

interface IVerifyOptions {
	message: string;
}

type Done = (error: any, user?: any, options?: IVerifyOptions) => void;

async function authenticateUser(email: string, password: string, done: Done) {
	const users: User[] = await getUsers();
	const user = findByKey(users, "email", email);
	if (!user) {
		done(null, false, { message: "no user with that email found" });
		return;
	}

	try {
		const passwordIsCorrect = await bcrypt.compare(password, user?.password);
		if (!passwordIsCorrect) {
			done(null, false, { message: "password is incorrect" });
			// password incorect
			return;
		}
		done(null, user);
	} catch (error) {
		done(error);
	}
}

export function initialize(passport: PassportStatic, getById: any) {
	passport.use(
		"local",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			authenticateUser,
		),
	);
	passport.serializeUser((user: any, done) => {
		console.log("DEBUG -> passport.serializeUser -> user", user);
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		console.log("DEBUG -> passport.deserializeUser -> id", id);
		const foundUser = await getById(id);
		console.log("DEBUG -> passport.deserializeUser -> foundUser", foundUser);
		return done(null, foundUser);
	});
}
