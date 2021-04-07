import classNames from 'classnames'
import React, { memo, useState } from 'react'
import {
	BsBookmark,
	BsBookmarkFill,
	BsFolder,
	BsFolderFill,
} from 'react-icons/bs'
import { useSetRecoilState } from 'recoil'

import { Mark } from '../../shared/mark/types/mark'
import { markStateFamily } from '../../state/marks'
import IconPalette from './IconPalette'

interface Props {
	mark: Mark
}

const ShowMark: React.FC<Props> = ({
	mark: { id, name, url, icon, color },
}) => {
	const setMark = useSetRecoilState(markStateFamily(id))
	const [isPaletteShowing, setIsPaletteShowing] = useState(false)

	let defaultIcon: JSX.Element
	if (color) {
		defaultIcon = url ? <BsBookmarkFill /> : <BsFolderFill />
	} else {
		defaultIcon = url ? <BsBookmark /> : <BsFolder />
	}

	const handleColorSelect = (color?: string) => {
		setIsPaletteShowing(false)
		setMark((mark) => (mark ? { ...mark, color } : mark))
	}

	return (
		<span
			className={classNames('icon-text', { 'has-text-weight-medium': !url })}
		>
			<span
				className="icon is-unselectable is-clickable is-relative"
				onClick={() => setIsPaletteShowing(true)}
				style={{ color }}
			>
				{icon || defaultIcon}

				{isPaletteShowing && (
					<IconPalette color={color} onSelect={handleColorSelect} />
				)}
			</span>

			{url ? (
				<a href={url} rel="noopener noreferrer" className="wspw">
					{name}
				</a>
			) : (
				<span className="wspw">{name}</span>
			)}
		</span>
	)
}

ShowMark.displayName = 'ShowMark'

export default memo(ShowMark)
