import { decompressSync, strFromU8 } from 'fflate'

import { Mark, MarkMap } from './types/mark'

export default function decompressMarkMap(
	compressedMarkMap: Uint8Array
): MarkMap {
	const stringified = strFromU8(decompressSync(compressedMarkMap))
	const marks: Mark[] = JSON.parse(stringified)
	return new Map(marks.map((mark) => [mark.id, mark]))
}
