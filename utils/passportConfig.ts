import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findByKey } from "./findBykey";
import { getUsers } from "./getUsers";
import { User } from "../types/user";

interface IVerifyOptions {
	message: string;
}

type Done = (error: any, user?: any, options?: IVerifyOptions) => void;

async function authenticateUser(email: string, password: string, done: Done) {
	const users: User[] = await getUsers();
	const user = findByKey(users, "email", email);
	if (!user) {
		done(null, false, { message: "no user with that email found" });
	}

	try {
		const passwordIsCorrect = await bcrypt.compare(password, user.password);
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

export function initialize(passport: PassportStatic) {
	passport.use(
		"local",
		new LocalStrategy(
			{
				usernameField: "email",
			},
			authenticateUser,
		),
	);
	// passport.serializeUser((user, done) => {done(null, user.id)});
	// passport.deserializeUser((id, done) => {done(null, getUserById(id))});
}
