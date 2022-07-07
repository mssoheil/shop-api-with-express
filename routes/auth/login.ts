import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("login.ejs");
});

router.post(
	"/",
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/auth/login",
		failureFlash: true,
	}),
);

export default router;
