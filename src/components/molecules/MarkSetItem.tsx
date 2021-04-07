import './MarkSetItem.sass'

import classNames from 'classnames'
import React, { memo, useState } from 'react'
import {
	AiFillEdit,
	BsXSquareFill,
	CgCornerDownRight,
	RiDeleteBin6Line,
} from 'react-icons/all'
import { useSetRecoilState } from 'recoil'

import { Mark } from '../../shared/mark/types/mark'
import { markStateFamily } from '../../state/marks'
import Control from '../atoms/Control'
import ShowMark from '../atoms/ShowMark'
import UpsertMark from '../atoms/UpsertMark'
import MarkSet from './MarkSet'

interface Props {
	mark: Mark
}

const MarkSetItem: React.FC<Props> = ({ mark }) => {
	const setMark = useSetRecoilState(markStateFamily(mark.id))
	const [isEditing, setIsEditing] = useState(false)
	const [isCreating, setIsCreating] = useState(false)

	return (
		<>
			<div
				className={classNames('MarkSetItem my-1 pl-2', {
					'is-hidden': isEditing,
				})}
			>
				<ShowMark mark={mark} />

				<span className="ml-4 MarkSetItem-controls">
					<Control className="ml-1 is-link" onClick={() => setIsEditing(true)}>
						<AiFillEdit />
					</Control>

					<Control
						className="ml-1 is-success"
						onClick={() => setIsCreating(true)}
					>
						<CgCornerDownRight />
					</Control>

					<div className="vr" />

					<Control
						className="is-danger"
						onClick={() => setMark(undefined)}
						confirmWith={<BsXSquareFill />}
					>
						<RiDeleteBin6Line />
					</Control>
				</span>
			</div>

			{isEditing && (
				<UpsertMark
					markID={mark.id}
					parentID={mark.parentID}
					onDone={() => setIsEditing(false)}
				/>
			)}

			{isCreating && (
				<div className="ml-5">
					<UpsertMark parentID={mark.id} onDone={() => setIsCreating(false)} />
				</div>
			)}

			<div className="ml-4 pl-1">
				<MarkSet parentMarkID={mark.id} />
			</div>
		</>
	)
}

MarkSetItem.displayName = 'MarkSetItem'

export default memo(MarkSetItem)
