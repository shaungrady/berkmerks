import './MarkSet.sass'

import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { markChildrenState, markStateFamily } from '../../state/marks'
import MarkSetItem from './MarkSetItem'

interface Props {
	parentMarkID: string
}

const MarkSet: React.FC<Props> = ({ parentMarkID }) => {
	const { color } = useRecoilValue(markStateFamily(parentMarkID)) ?? {}
	const markChildren = useRecoilValue(markChildrenState(parentMarkID))

	return (
		<ul className="MarkSet" style={{ borderColor: color ? `${color}88` : '' }}>
			{markChildren.map((mark) => (
				<li key={mark.id} className="MarkSet-row">
					<MarkSetItem mark={mark} />
				</li>
			))}
		</ul>
	)
}

MarkSet.displayName = 'MarkSet'

export default memo(MarkSet)
