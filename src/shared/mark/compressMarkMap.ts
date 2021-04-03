import { compressSync, strToU8 } from 'fflate'

import { ArrayifiedMarkMap, MarkMap } from './types/mark'

export function compressMarkMap(markMap: MarkMap): Uint8Array {
	const arrayified: ArrayifiedMarkMap = [...markMap].map(([id, set]) => [
		id,
		[...set],
	])
	const stringified = JSON.stringify(arrayified)
	return compressSync(strToU8(stringified))
}
