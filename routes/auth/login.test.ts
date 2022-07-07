import request from "supertest";

describe("Login API", () => {
	it("GET /auth/login --> render login page", async () => {
		await request("http://localhost:5000/auth/login")
			.get("/")
			.expect(200)
			.expect("Content-Type", /text\/html/);
	});
});
