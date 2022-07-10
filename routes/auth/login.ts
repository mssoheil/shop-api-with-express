import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("login.ejs");
});

router.post(
	"/",
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		failureFlash: true,
	}),
	(req, res) => {
		// @ts-ignore
		req.email = req.email || "moolan";
		// @ts-ignore
		res.email = res.email || "moolan";
		res.redirect("/dashboard");
	},
);

export default router;
