import request from "supertest";

describe("Register API", () => {
	it("GET /auth/register --> render register page", async () => {
		await request("http://localhost:5000/auth/register")
			.get("/")
			.expect(200)
			.expect("Content-Type", /text\/html/);
	});
});
