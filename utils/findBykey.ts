export function findByKey(items: any[] = [], key: string, value: any) {
	if (items && Array.isArray(items)) {
		return items.find((item) => item[key] === value);
	}
	return null;
}
