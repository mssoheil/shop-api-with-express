import express from "express";
import { registerUser } from "./services/register";

const router = express.Router();

router.get("/", (_, res) => {
	res.render("register.ejs");
});

router.post("/", (req, res) => {
	registerUser(req, res);
});

router.post("/", (req, res) => {
	registerUser(req, res);
});

export default router;
