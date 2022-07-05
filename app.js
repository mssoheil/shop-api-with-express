"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
// Routes
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("view-engin", "ejs");
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});
app.use("/auth", auth_1.default);
app.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs");
});
app.get("/register", (req, res) => {
    res.render("register.ejs");
});
const port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(chalk_1.default.cyan(`listening on port ${port}...`));
});
exports.default = app;
