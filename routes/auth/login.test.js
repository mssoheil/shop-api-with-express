const request = require("supertest");

describe("Login API", () => {
	it("GET /auth/login --> render login page", () => {
		return request("http://localhost:5000/auth/login")
			.get("/")
			.expect("Content-Type", /text\/html/);
	});
});
