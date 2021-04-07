import sortMarks from './sortMarks'
import { Mark } from './types/mark'

/**
 * Creates a copy-by-value sorted Set
 * @returns
 * `Set<Mark>` or `undefined` if Set is empty.
 */
export default function createSortedMarkSet(
	source: Set<Mark> | Mark[]
): Set<Mark> | undefined {
	const sortedSourceCopy = [...source].sort(sortMarks)
	if (!sortedSourceCopy.length) {
		return undefined
	}

	return new Set<Mark>(sortedSourceCopy)
}
