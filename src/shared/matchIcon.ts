import dingbatsRegex from './dingbatsRegex'
import emojiRegex from './emojiRegex'

const matchIcon = (url: string = ''): string | undefined =>
	(url.match(emojiRegex()) ?? url.match(dingbatsRegex()) ?? []).shift()

export default matchIcon
