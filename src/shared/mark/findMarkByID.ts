import { Mark, MarkSet } from './types/mark'

export default function findMarkByID(
	set: MarkSet | undefined,
	markID: string | undefined
): Mark | undefined {
	if (set == null || markID == null) {
		return
	}

	for (const mark of set.values()) {
		if (mark.id === markID) {
			return mark
		}
	}
}
