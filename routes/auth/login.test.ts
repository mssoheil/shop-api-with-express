import request from "supertest";
import createServer from "../../utils/server";
import path from "path";
import fs from "fs-extra";

const app = createServer();

describe("Login API", () => {
	it("GET /auth/login --> render login page", async () => {
		// await request(app)
		// 	.get("/auth/login")
		await request("http://localhost:5000/auth/login")
			.get("/")
			.expect(200)
			.expect("Content-Type", /text\/html/);
	});
	it("POST /auth/login --> login if email and password are correct", async () => {
		const users = await fs.readFile(path.join(__dirname, "../../data/users.json"), "utf8");
		await request(app)
			.post("/auth/login")
			.send({
				email: "myCorrectEmail@myCorrectEmail.com",
				password: "myCorrectPassword",
			})
			.expect("Content-Type", /json/)
			.expect(200);
	});
	it("POST /auth/login --> login if passport login were successful", async () => {
		await request(app)
			.post("/auth/login")
			.send({
				email: "myCorrectPassportEmail@myCorrectPassportEmail.com",
				password: "myCorrectPassportPassword",
			})
			.expect("Content-Type", /json/)
			.expect(200);
	});
	it("POST /auth/login --> 401 if email and password are incorrect or passport login were unsuccessful", async () => {
		await request(app)
			.post("/auth/login")
			.send({
				email: "incorrectEmail@incorrectEmail.com",
				password: "incorrectPassword",
			})
			.expect("Content-Type", /json/)
			.expect(401);
	});
	it("POST /auth/login --> set role to admin if login used with admin email and password", async () => {
		await request(app)
			.post("/auth/login")
			.send({
				email: "incorrectPassportEmail@incorrectPassportEmail.com",
				password: "incorrectPassportPassword",
			})
			.expect("Content-Type", /json/)
			.expect(401);
	});
});
