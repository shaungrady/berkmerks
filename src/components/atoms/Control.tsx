import classNames from 'classnames'
import React, { ReactNode, useEffect, useState } from 'react'

interface Props {
	onClick: () => unknown
	className?: string
	confirmWith?: ReactNode
}

const Control: React.FC<Props> = ({
	onClick,
	className = '',
	confirmWith,
	children,
}) => {
	const [isConfirming, setIsConfirming] = useState(false)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		if (!isHovered && isConfirming) {
			setIsConfirming(false)
		}
	}, [isHovered, isConfirming])

	const handleClick = () => {
		if (confirmWith == null || isConfirming) {
			setIsConfirming(false)
			onClick()
		} else {
			setIsConfirming(true)
		}
	}

	const classes = classNames(className, 'tag is-small is-clickable', {
		'is-light': !isHovered,
	})

	return (
		<span
			onClick={handleClick}
			className={classes}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isConfirming ? (
				<span className="icon is-small">{confirmWith}</span>
			) : (
				<span className="icon is-small">{children}</span>
			)}
		</span>
	)
}

export default Control
