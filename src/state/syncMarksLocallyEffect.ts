import * as localforage from 'localforage'
import { AtomEffect, DefaultValue } from 'recoil'

import storageKey from '../constants/storageKey'
import compressMarks from '../shared/mark/compressMarks'
import decompressMarkMap from '../shared/mark/decompressMarkMap'
import getDefaultMarks from '../shared/mark/getDefaultMarks'
import { MarkMap } from '../shared/mark/types/mark'

const syncMarksLocallyEffect: AtomEffect<MarkMap> = ({ setSelf, onSet }) => {
	const loadPersisted = async () => {
		const compressedMap = await localforage.getItem<Uint8Array>(storageKey)
		compressedMap != null
			? setSelf(decompressMarkMap(compressedMap))
			: setSelf(getDefaultMarks())
	}

	loadPersisted()

	onSet((newValue) =>
		newValue instanceof DefaultValue
			? localforage.removeItem(storageKey)
			: localforage.setItem(storageKey, compressMarks(newValue))
	)
}

export default syncMarksLocallyEffect
