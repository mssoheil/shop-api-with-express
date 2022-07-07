/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testTimeout: 20000,
	testMatch: ["**/**/*.test.ts"],
	verbose: true,
	// forceExit: true,
	// clearMocks: true
};
