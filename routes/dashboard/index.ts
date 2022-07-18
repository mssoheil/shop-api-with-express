import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	// @ts-ignore
	if (!req?.user?.email) {
		return res.redirect("/auth/login");
	}
	// @ts-ignore
	res.render("dashboard.ejs", { email: req.user.email, role: req.user.role });
});

router.get("/edit-item", (req, res) => {
	// @ts-ignore
	if (!req?.user?.email) {
		return res.redirect("/auth/login");
	}
	// @ts-ignore
	res.render("itemsEdit.ejs", { email: req.user.email, role: req.user.role });
});

export default router;
