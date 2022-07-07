import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("register.ejs");
});

export default router;
