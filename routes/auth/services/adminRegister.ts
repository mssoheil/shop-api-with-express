// Utilities
import { getUserByEmail, getUsers } from "../../../utils/getSetUsers";
import { handleBadRequest, handleConflict, handleCreateUser } from "./services.utils";
// Types
import type { Request, Response } from "express";
import type { User } from "../../../types/user";

export async function registerAdminUser(req: Request, res: Response) {
	try {
		const { body } = req;
		if (!body.email || !body.password) {
			handleBadRequest(req, res);
		}
		const users: User[] = await getUsers();
		const foundUser = await getUserByEmail(users, body.email);
		if (foundUser) {
			handleConflict(req, res);
		}

		handleCreateUser(req, res, users, "ADMIN");
	} catch (error) {
		console.log("DEBUG -> router.post -> error", error);
	}
}
