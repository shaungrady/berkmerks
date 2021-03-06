import matchIcon from '../matchIcon'
import matchURL from '../matchURL'
import { Mark } from './types/mark'

/** Create a Mark with an optional predefined ID. */
export default function parseStringToMark(
	value: string,
	id: string = '',
	parentID: string
): Mark | undefined {
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

	return { id, parentID, name, url, icon }
}
