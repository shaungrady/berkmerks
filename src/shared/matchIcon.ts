import emojiRegex from './emojiRegex'
import symbolsRegex from './symbolsRegex'

const matchIcon = (url: string = ''): string | undefined =>
	(url.match(emojiRegex()) ?? url.match(symbolsRegex()) ?? []).shift()

export default matchIcon
