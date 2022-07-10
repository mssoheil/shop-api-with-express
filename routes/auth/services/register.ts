import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { getUserByEmail, getUsers, setUsers } from "../../../utils/getSetUsers";
// Types
import type { Request, Response } from "express";
import type { User } from "../../../types/user";
import flash from "express-flash";

export async function registerUser(req: Request, res: Response) {
	console.log("BB", req.body);
	try {
		const { body } = req;
		if (!body.email || !body.password) {
			res.status(400);
			req.flash("error", "Please provide Email and password");
			res.redirect("/auth/register");
			return;
		}
		const users: User[] = await getUsers();
		const foundUser = await getUserByEmail(users, body.email);
		if (foundUser) {
			res.status(409);
			req.flash("error", "User exists");
			res.redirect("/auth/register");
			return;
		}

		const encryptedPassword = await bcrypt.hash(body?.password, 10);
		const newUser: User = {
			id: uuidV4(),
			email: body?.email,
			password: encryptedPassword,
			role: "BASIC",
		};
		users.push(newUser);
		setUsers(users);
		res.status(201);
		res.redirect("/auth/login");
	} catch (error) {
		console.log("DEBUG -> router.post -> error", error);
	}
}
