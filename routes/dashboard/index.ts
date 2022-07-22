import express from "express";
// Utils
import { getEmailAndRoleFromRequest } from "../../utils";
import { checkLoggedIn } from "../../utils/authentication";
import { getItems } from "../../utils/items";
// Routes
import itemsRoute from "./routes/items";

const router = express.Router();

router.get("/", checkLoggedIn, (req, res) => {
	// @ts-ignore
	res.render("dashboard.ejs", getEmailAndRoleFromRequest(req));
});

router.get("/edit-item", checkLoggedIn, async (req, res) => {
	let items = await getItems();
	// @ts-ignore
	res.render("itemsEdit.ejs", { ...getEmailAndRoleFromRequest(req), items });
});

router.use("/items", checkLoggedIn, itemsRoute);

export default router;
