import { decompressSync, strFromU8 } from 'fflate'

import { ArrayifiedMarkMap, MarkMap } from './types/mark'

export function decompressMarkMap(compressedMarkMap: Uint8Array): MarkMap {
	const stringified = strFromU8(decompressSync(compressedMarkMap))
	const arrayified: ArrayifiedMarkMap = JSON.parse(stringified)
	return new Map(arrayified.map(([id, set]) => [id, new Set(set)]))
}
