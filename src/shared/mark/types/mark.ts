export interface Mark {
	parentID: string
	id: string
	name: string
	url?: string
	icon?: string
	color?: string
}

export type MarkMap = Map<string, Mark>

/** MarkMap in primitive Array form for stringification. */
export type ArrayifiedMarkMap = [string, Mark[]][]
