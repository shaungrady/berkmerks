import { atom } from 'recoil'

import { MarkMap } from '../shared/mark/types/mark'

export const markMapState = atom<MarkMap>({
	key: 'MarkMap',
	default: new Map(),
})
