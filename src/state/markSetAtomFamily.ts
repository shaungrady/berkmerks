import { atomFamily, selector, selectorFamily } from 'recoil'

import getDefaultMarkMap from '../shared/mark/getDefaultMarkMap'
import { MarkMap, MarkSet } from '../shared/mark/types/mark'
import { markMapState } from './markMapAtom'

const currentUserMarks = selector<MarkMap>({
	key: 'CurrentUserMarks',
	get: async () => getDefaultMarkMap(),
})

export const markSetStateFamily = atomFamily<MarkSet | undefined, string>({
	key: 'MarkSet',
	default: selectorFamily({
		key: 'MarkSet/Default',
		get: (id) => ({ get }) => get(currentUserMarks).get(id),
	}),
})

export const markSetSizeFamily = atomFamily<number, string>({
	key: 'MarkSetSize',
	default: selectorFamily({
		key: 'MarkSet/Size',
		get: (id) => ({ get }) => get(markMapState).get(id)?.size ?? 0,
	}),
})
