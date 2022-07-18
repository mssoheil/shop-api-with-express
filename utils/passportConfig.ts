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
	try {
		const users: User[] = await getUsers();
		const user = findByKey(users, "email", email);
		if (!user) {
			done(null, false, { message: "no user with that email found" });
			return;
		}

		const passwordIsCorrect = await bcrypt.compare(password, user?.password);
		if (!passwordIsCorrect) {
			done(null, false, { message: "password is incorrect" });
			// password incorect
			return;
		}
		done(null, user);
	} catch (error) {
		done("error happened in the server");
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
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		const foundUser = await getById(id);
		return done(null, foundUser);
	});
}
