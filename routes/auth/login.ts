import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
	res.render("login.ejs");
});

router.post("/", (req, res) => {
	console.log("REEE", req.body);
});

export default router;
