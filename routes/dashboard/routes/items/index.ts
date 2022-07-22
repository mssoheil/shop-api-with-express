import express from "express";
import { v4 as uuidV4 } from "uuid";
import { getEmailAndRoleFromRequest } from "../../../../utils";
import { getItems, setItems } from "../../../../utils/items";

const router = express.Router();

router.get("/", async (req, res) => {
	const items = await getItems();
});

router.post("/", async (req, res) => {
	try {
		const { name, description, price } = req.body;
		const newItem = {
			id: uuidV4(),
			name,
			description,
			price,
		};

		let items = await getItems();

		if (!Array.isArray(items)) {
			items = [];
			return res.end(items);
		}

		const newItemList = [...items, newItem];

		await setItems(newItemList);

		res.render("itemsEdit.ejs", {
			...getEmailAndRoleFromRequest(req),
			items: newItemList,
		});
	} catch (error) {
		console.log("DEBUG -> router.post -> error", error);
	}
});

export default router;
