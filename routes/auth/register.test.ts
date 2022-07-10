import request from "supertest";

describe("Register API", () => {
	it("GET /auth/register --> render register page", async () => {
		await request("http://localhost:5000/auth/register")
			.get("/")
			.expect(200)
			.expect("Content-Type", /text\/html/);
	});

	it("POST /auth/register -> adds to users if email not exist", async () => {
		await request("http://localhost:5000/auth/register")
			.post("/")
			.send({
				email: "mool88@mool88.com",
				password: "mool88",
			})
			.expect("Content-Type", /json/)
			.expect(201);
	});
	it("POST /auth/register -> 409 if user exists", async () => {
		await request("http://localhost:5000/auth/register").post("/").send({
			email: "mool88@mool88.com",
			password: "mool88",
		});
		await request("http://localhost:5000/auth/register")
			.post("/")
			.send({
				email: "mool88@mool88.com",
				password: "mool88",
			})
			.expect("Content-Type", /json/)
			.expect(409);
	});
	it("POST /auth/register -> 400 if email has not provided", async () => {
		await request("http://localhost:5000/auth/register")
			.post("/")
			.send({
				password: "mool88",
			})
			.expect("Content-Type", /json/)
			.expect(400);
	});
	it("POST /auth/register -> 400 if password has not provided", async () => {
		await request("http://localhost:5000/auth/register")
			.post("/")
			.send({
				email: "mool88@mool88.com",
			})
			.expect("Content-Type", /json/)
			.expect(400);
	});
});
