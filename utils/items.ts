import fs from "fs-extra";
import path from "path";
// Types
import type { Item } from "../types/items";

export async function getItems() {
	const itemsPath = path.join(__dirname, "../data/items.json");
	try {
		const items = await fs.readFile(itemsPath, "utf8");
		return JSON.parse(items);
	} catch (error) {
		console.log("DEBUG -> getItems -> error", error);
		return "Error occured";
	}
}

export function setItems(items: Item[]) {
	const itemsPath = path.join(__dirname, "../data/items.json");
	try {
		return fs.writeFile(itemsPath, JSON.stringify(items));
	} catch (error) {
		console.log("DEBUG -> setItems -> error", error);

		return "Error occured";
	}
}
