export interface Mark {
	id: string
	name: string
	url?: string
	icon?: string
}

export type MarkSet = Set<Mark>

export type MarkMap = Map<string, MarkSet>

/** MarkMap in primitive Array form for stringification. */
export type ArrayifiedMarkMap = [string, Mark[]][]
