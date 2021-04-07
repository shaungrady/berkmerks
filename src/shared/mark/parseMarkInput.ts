import matchIcon from '../matchIcon'
import matchURL from '../matchURL'
import { Mark } from './types/mark'

type partialMark = { name: string; url?: string; icon?: string }

/** Create a Mark with an optional predefined ID. */
export default function parseMarkInput(value: string): partialMark | undefined
export default function parseMarkInput(
	value: string,
	markToUpdate: Mark
): Mark | undefined
export default function parseMarkInput(
	value: string,
	markToUpdate?: Mark
): Mark | partialMark | undefined {
	const string = value.trim()
	if (!string) {
		return
	}

	const rawURL = matchURL(string)
	let name: string
	let url: string | undefined
	let icon: string | undefined

	if (rawURL == null) {
		name = string
	} else {
		url = rawURL.startsWith('www.') ? `https://${rawURL}` : rawURL
		name = string.replace(rawURL, '').trim() || rawURL
	}

	const emoji = matchIcon(name)
	if (emoji && name.startsWith(emoji)) {
		icon = emoji
		name = name.replace(emoji, '').trim()
	}

	const partialMark = { name, url, icon }
	return markToUpdate ? { ...markToUpdate, ...partialMark } : partialMark
}
