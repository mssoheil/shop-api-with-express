export type Role = "ADMIN" | "BASIC";

export interface User {
	id?: string;
	email: string;
	password: string;
	role?: Role;
}
