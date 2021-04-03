import { Mark } from './types/mark'

export function sortMarks(a: Mark, b: Mark): number {
	const urlCompare = (a.url ? 1 : -1) - (b.url ? 1 : -1)

	return a.name.localeCompare(b.name) + urlCompare
}
