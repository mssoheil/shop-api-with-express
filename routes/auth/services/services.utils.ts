import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { setUsers } from "../../../utils/getSetUsers";
// Types
import type { Request, Response } from "express";
import type { Role, User } from "../../../types/user";

export function handleBadRequest(req: Request, res: Response) {
	res.status(400);
	req.flash("error", "Please provide Email and password");
	res.redirect("/auth/register");
	return;
}

export function handleConflict(req: Request, res: Response) {
	res.status(409);
	req.flash("error", "User exists");
	res.redirect("/auth/register");
	return;
}

export async function handleCreateUser(req: Request, res: Response, users: User[], role: Role) {
	const { body } = req;
	const encryptedPassword = await bcrypt.hash(body?.password, 10);
	const newUser: User = {
		id: uuidV4(),
		email: body?.email,
		password: encryptedPassword,
		role: role,
	};
	users.push(newUser);
	setUsers(users);
	res.status(201);
	if (role === "BASIC") {
		return res.redirect("/auth/login");
	}
	res.send("User crated");
}
