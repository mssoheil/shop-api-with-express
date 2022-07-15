import express from "express";
// Routes
import loginRoute from "./login";
import registerRoute from "./register";
import adminRegisterRoute from "./adminRegister";

const router = express.Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/admin/register", adminRegisterRoute);

export default router;
