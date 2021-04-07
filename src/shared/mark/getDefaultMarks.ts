import Color from '../../constants/color'
import rootMarkID from '../../constants/rootMarkID'
import createMarkID from './createMarkID'
import parseMarkInput from './parseMarkInput'
import { Mark } from './types/mark'

// prettier-ignore
export default function getDefaultMarks(): Map<string, Mark> {
	const marks: Mark[] = []

	const sg = {
		id: createMarkID(), parentID: rootMarkID,
		...parseMarkInput('👨‍💻 Shaun Grady https://shaungrady.com')!
	}

	marks.push(
		sg,
		{
			id: createMarkID(), parentID: sg.id,
			...parseMarkInput('LinkedIn https://www.linkedin.com/in/shaungrady')!
		},
		{
			id: createMarkID(), parentID: sg.id,
			...parseMarkInput('GitHub https://shaungrady.com')!
		}
	)

	const built = {
		id: createMarkID(), parentID: rootMarkID, color: Color.Gray,
		...parseMarkInput('Built Using')!
	}
	const react = {
		id: createMarkID(), parentID: built.id, color: Color.Violet,
		...parseMarkInput('⚛️ React https://reactjs.org/')!
	}

	marks.push(
		built,
		{
			id: createMarkID(), parentID: built.id,
			...parseMarkInput('Bulma https://bulma.io/')!
		},
		{
			id: createMarkID(), parentID: built.id,
			...parseMarkInput('TypeScript https://www.typescriptlang.org/')!
		},
		react,
		{
			id: createMarkID(), parentID: react.id,
			...parseMarkInput('Recoil https://recoiljs.org/')!
		},
		{
			id: createMarkID(), parentID:  react.id,
			...parseMarkInput('Create React App https://create-react-app.dev/')!
		}
	)


	marks.push({
			id: createMarkID(), parentID: rootMarkID,
			...parseMarkInput('Berkmerks Repo https://github.com/shaungrady/berkmerks')!
		})

	return new Map(marks.map(mark => [mark.id, mark]))
}
