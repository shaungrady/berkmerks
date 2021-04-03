import classNames from 'classnames'
import React from 'react'
import { BsBookmark, BsFolder } from 'react-icons/bs'

import { Mark } from '../../shared/mark/types/mark'

interface Props {
	mark: Mark
}

const ShowMark: React.FC<Props> = ({ mark: { name, url, icon } }) => {
	const defaultIcon = url ? <BsBookmark /> : <BsFolder />

	return (
		<span
			className={classNames('icon-text', { 'has-text-weight-medium': !url })}
		>
			<span className="icon is-unselectable">{icon || defaultIcon}</span>
			{url ? (
				<a href={url} rel="noopener noreferrer">
					{name}
				</a>
			) : (
				<span>{name}</span>
			)}
		</span>
	)
}

export default ShowMark
