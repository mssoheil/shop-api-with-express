import fs from "fs-extra";
import path from "path";
// Types
import type { User } from "../types/user";

export async function getUsers() {
	const usersPath = path.join(__dirname, "../data/users.json");
	const users = await fs.readFile(usersPath, "utf8");
	return JSON.parse(users);
}

export async function setUsers(users: User[]) {
	const usersPath = path.join(__dirname, "../data/users.json");
	await fs.writeFile(usersPath, JSON.stringify(users));
}

export async function getUserById(users: User[], id: string) {
	return users.find((user) => user.id === id);
}

export async function getUserByEmail(users: User[], email: string) {
	return users.find((user) => user.email === email);
}
