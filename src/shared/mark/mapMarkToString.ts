import { Mark } from './types/mark'

export default function mapMarkToString({
	name,
	url = '',
	icon = '',
}: Mark): string {
	return name !== url
		? `${icon} ${name} ${url}`.trim()
		: `${icon} ${url}`.trim()
}
