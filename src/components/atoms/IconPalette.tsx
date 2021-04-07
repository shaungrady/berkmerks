import './IconPalette.sass'

import React, { useEffect, useRef } from 'react'
import { BsFillCircleFill, BsXCircle } from 'react-icons/bs'
import { FaDotCircle } from 'react-icons/fa'

import Color from '../../constants/color'

interface Props {
	color?: string
	onSelect: (color?: string) => unknown
}

const colors = [
	Color.Red,
	Color.Orange,
	Color.Yellow,
	Color.Violet,
	Color.None,
	Color.Green,
	Color.Indigo,
	Color.Gray,
	Color.Blue,
] as const

const IconPalette: React.FC<Props> = ({ onSelect, color: currentColor }) => {
	const node = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (node.current && !node.current.contains(e.target as Node)) {
				onSelect(currentColor)
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [currentColor, node, onSelect])

	const handleClick = (event: React.MouseEvent, color?: string) => {
		event.stopPropagation()
		onSelect(color)
	}

	return (
		<div ref={node} className="IconPalette box is-rounded p-2">
			{colors.map((color) => {
				if (!color) {
					return (
						<BsXCircle
							className="has-text-grey"
							key={color}
							onClick={(e) => handleClick(e)}
						/>
					)
				}
				if (color === currentColor) {
					return (
						<FaDotCircle
							key={color}
							style={{ color }}
							onClick={(e) => handleClick(e, color)}
						/>
					)
				}
				return (
					<BsFillCircleFill
						key={color}
						style={{ color }}
						onClick={(e) => handleClick(e, color)}
					/>
				)
			})}
		</div>
	)
}

IconPalette.displayName = 'IconPalette'

export default IconPalette
