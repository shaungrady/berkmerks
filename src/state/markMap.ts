import * as localforage from 'localforage'
import { AtomEffect, DefaultValue, atom, selectorFamily } from 'recoil'

import storageKey from '../constants/storageKey'
import { compressMarkMap } from '../shared/mark/compressMarkMap'
import { decompressMarkMap } from '../shared/mark/decompressMarkMap'
import getDefaultMarkMap from '../shared/mark/getDefaultMarkMap'
import { MarkMap, MarkSet } from '../shared/mark/types/mark'

const localForageEffect = (key: string): AtomEffect<MarkMap> => ({
	setSelf,
	onSet,
}) => {
	const loadPersisted = async () => {
		const compressedMap = await localforage.getItem<Uint8Array>(key)
		compressedMap != null
			? setSelf(decompressMarkMap(compressedMap))
			: setSelf(getDefaultMarkMap())
	}

	loadPersisted()

	onSet((newValue) => {
		if (newValue instanceof DefaultValue) {
			localforage.removeItem(storageKey)
		} else {
			localforage.setItem(storageKey, compressMarkMap(newValue))
		}
	})
}

const markMapState = atom<MarkMap>({
	key: 'MarkMap',
	default: new Map(),
	effects_UNSTABLE: [localForageEffect(storageKey)],
})

export const markMapSetState = selectorFamily<MarkSet | undefined, string>({
	key: 'MarkMapSet',
	get: (markID) => async ({ get }) => (await get(markMapState)).get(markID),
	set: (markID) => ({ get, set }, newValue) => {
		const markSet = newValue instanceof DefaultValue ? undefined : newValue
		const markMap = get(markMapState)
		markSet?.size ? markMap.set(markID, markSet) : markMap.delete(markID)
		set(markMapState, new Map([...markMap]))
	},
})
