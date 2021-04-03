import urlRegex from './urlRegex'

/** Matches the longest, last-occurring URL in a given string. */
const matchURL = (value: string = ''): string | undefined => {
	const urls = value.match(urlRegex()) ?? []
	const urlsByLength = urls.sort((a, b) => a.length - b.length).reverse()
	return urlsByLength[0]
}

export default matchURL
