import express from "express";
import { registerAdminUser } from "./services/adminRegister";

const router = express.Router();

router.post("/", (req, res) => {
	registerAdminUser(req, res);
});

export default router;
