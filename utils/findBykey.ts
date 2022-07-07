export function findByKey(items: any[] = [], key: string, value: any) {
	return items.find((item) => item[key] === value);
}
