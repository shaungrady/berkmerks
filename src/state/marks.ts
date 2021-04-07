import isEqual from 'lodash.isequal'
import { DefaultValue, atom, selectorFamily } from 'recoil'

import createMarkID from '../shared/mark/createMarkID'
import sortMarks from '../shared/mark/sortMarks'
import { Mark, MarkMap } from '../shared/mark/types/mark'
import pruneDanglingMarksEffect from './pruneDanglingMarksEffect'
import syncMarksLocallyEffect from './syncMarksLocallyEffect'

const marksState = atom<MarkMap>({
	key: 'Marks',
	default: new Map(),
	effects_UNSTABLE: [pruneDanglingMarksEffect, syncMarksLocallyEffect],
})

/** For Mark creation, use an id of `''` (empty string). */
export const markStateFamily = selectorFamily<Mark | undefined, string>({
	key: 'Mark',

	get: (id) => ({ get }) => (!id ? undefined : get(marksState).get(id)),

	set: (id) => ({ set }, newValue) => {
		set(marksState, (marks) => {
			console.group(`Updating Mark ID '${id}'`)
			const newMark = newValue instanceof DefaultValue ? undefined : newValue
			const oldMark = marks.get(id)

			if (id && (newMark === oldMark || isEqual(newMark, oldMark))) {
				console.debug(`Mark unchanged; not updating`)
				console.groupEnd()
				return marks
			}

			marks = new Map([...marks]) as MarkMap

			if (newMark) {
				newMark.id ||= createMarkID()
				console.debug(`Inserting new Mark with ID '${newMark.id}'`)
				marks.set(newMark.id, newMark)
			} else {
				console.debug(`Mark nullish; removing`)
				marks.delete(id)
			}

			console.groupEnd()
			return marks
		})
	},
})

export const markChildrenState = selectorFamily<Mark[], string>({
	key: 'MarkChildren',
	get: (markID) => ({ get }) =>
		[...get(marksState).values()]
			.filter((mark) => mark.parentID === markID)
			.sort(sortMarks),
})
