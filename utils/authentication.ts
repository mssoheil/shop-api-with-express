import type { NextFunction, Response } from "express";

export function checkLoggedIn(req: Record<string, any>, res: Response, next: NextFunction) {
	if (!req?.user?.email) {
		return res.redirect("/auth/login");
	}
	next();
}
