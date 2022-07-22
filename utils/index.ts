export function getEmailAndRoleFromRequest(req: Record<string, any>) {
	return { email: req.user.email, role: req.user.role };
}
