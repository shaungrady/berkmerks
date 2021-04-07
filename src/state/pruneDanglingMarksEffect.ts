import { AtomEffect, DefaultValue } from 'recoil'

import rootMarkID from '../constants/rootMarkID'
import { Mark } from '../shared/mark/types/mark'

type MarkMap = Map<string, Mark>

const pruneDanglingMarksEffect: AtomEffect<MarkMap> = ({ onSet }) =>
	onSet((newMarks, oldMarks) => {
		if (
			newMarks instanceof DefaultValue ||
			oldMarks instanceof DefaultValue ||
			newMarks.size >= oldMarks.size
		) {
			return newMarks
		}

		const sizeBeforePruning = newMarks.size

		// Maps preserve insertion order, so children will always appear after their
		// parents. If parent reassignment is ever added, this will have to be
		// reconsidered.
		for (const { id, parentID } of newMarks.values()) {
			const isRootMark = parentID === rootMarkID
			const isDangling = !isRootMark && !newMarks.has(parentID)
			if (isDangling) {
				newMarks.delete(id)
			}
		}

		if (newMarks.size !== sizeBeforePruning) {
			console.debug(
				`Pruned ${sizeBeforePruning - newMarks.size} dangling Mark(s)`
			)
		}
	})

export default pruneDanglingMarksEffect
