import './MarkSetItem.sass'

import classNames from 'classnames'
import React, { memo, useCallback, useState } from 'react'
import {
	BsArrowReturnRight,
	BsPencil,
	BsTrash,
	BsXSquareFill,
} from 'react-icons/bs'
import { useSetRecoilState } from 'recoil'

import createSortedMarkSet from '../../shared/mark/createSortedMarkSet'
import { Mark } from '../../shared/mark/types/mark'
import { markSetStateFamily } from '../../state/markSetAtomFamily'
import Control from '../atoms/Control'
import ShowMark from '../atoms/ShowMark'
import UpsertMark from '../atoms/UpsertMark'
import MarkSet from './MarkSet'

interface Props {
	mark: Mark
	parentMarkID: string
}

const MarkSetItem: React.FC<Props> = memo(({ mark, parentMarkID }) => {
	const markSetRecoilState = markSetStateFamily(parentMarkID)
	const setMarkSet = useSetRecoilState(markSetRecoilState)

	const [isEditing, setIsEditing] = useState(false)
	const [isCreating, setIsCreating] = useState(false)

	const handleDelete = useCallback(() => {
		setMarkSet((oldMarkSet) => {
			if (oldMarkSet) {
				oldMarkSet.delete(mark)
				return createSortedMarkSet(oldMarkSet)
			}
		})
	}, [mark, setMarkSet])

	return (
		<>
			<div
				className={classNames('MarkSetItem my-1 pl-2', {
					'is-hidden': isEditing,
				})}
			>
				<ShowMark mark={mark} />

				<span className="ml-4 MarkSetItem-controls ">
					<Control
						className="ml-1 is-success"
						onClick={() => setIsCreating(true)}
					>
						<BsArrowReturnRight />
					</Control>

					<Control className="ml-1 is-link" onClick={() => setIsEditing(true)}>
						<BsPencil />
					</Control>

					<Control
						className="ml-1 is-danger"
						onClick={() => handleDelete()}
						confirmWith={<BsXSquareFill />}
					>
						<BsTrash />
					</Control>
				</span>
			</div>

			{isEditing && (
				<UpsertMark
					markID={mark.id}
					parentMarkID={parentMarkID}
					onDone={() => setIsEditing(false)}
				/>
			)}

			{isCreating && (
				<div className="ml-5">
					<UpsertMark
						parentMarkID={mark.id}
						onDone={() => setIsCreating(false)}
					/>
				</div>
			)}

			<div className="ml-4 pl-1">
				<MarkSet parentMarkID={mark.id} />
			</div>
		</>
	)
})

export default MarkSetItem
