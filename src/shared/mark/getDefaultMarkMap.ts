import rootMarkID from '../../constants/rootMarkID'
import { parseStringToMark } from './parseStringToMark'
import { sortMarks } from './sortMarks'
import { Mark, MarkMap } from './types/mark'

export default function getDefaultMarkMap(): MarkMap {
	const map: MarkMap = new Map()

	const sg = parseStringToMark('👨‍💻 Shaun Grady https://shaungrady.com')!
	const sgMarks: Mark[] = [
		parseStringToMark('LinkedIn https://www.linkedin.com/in/shaungrady')!,
		parseStringToMark('GitHub https://shaungrady.com')!,
	].sort(sortMarks)

	const builtWith = parseStringToMark('Built Using')!
	const react = parseStringToMark('⚛️ React https://reactjs.org/')!
	const builtWithMarks: Mark[] = [
		react,
		parseStringToMark('Bulma https://bulma.io/')!,
		parseStringToMark('TypeScript https://www.typescriptlang.org/')!,
	].sort(sortMarks)

	const reactMarks: Mark[] = [
		parseStringToMark('Recoil https://recoiljs.org/')!,
		parseStringToMark('Create React App https://create-react-app.dev/')!,
	].sort(sortMarks)

	const rootMarks = [
		sg,
		builtWith,
		parseStringToMark('ASPCA https://www.aspca.org/')!,
		parseStringToMark('Humane Society https://www.humanesociety.org/')!,
		parseStringToMark('World Wildlife Fund https://www.worldwildlife.org/')!,
	].sort(sortMarks)

	map.set(rootMarkID, new Set<Mark>(rootMarks))
	map.set(sg.id, new Set<Mark>(sgMarks))
	map.set(builtWith.id, new Set<Mark>(builtWithMarks))
	map.set(react.id, new Set<Mark>(reactMarks))

	return map
}
