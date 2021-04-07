import { compressSync, strToU8 } from 'fflate'

import { MarkMap } from './types/mark'

export default function compressMarks(markMap: MarkMap): Uint8Array {
	const marks = [...markMap.values()]
	const stringified = JSON.stringify(marks)
	return compressSync(strToU8(stringified))
}
