import fs from "fs-extra";
import path from "path";

export async function getUsers() {
	const usersPath = path.join(__dirname, "../data/users.json");
	const users = await fs.readFile(usersPath, "utf8");
	return JSON.parse(users);
}
