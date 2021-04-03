import './MarkSet.sass'

import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { markMapSetState } from '../../state/markMap'
import MarkSetItem from './MarkSetItem'

interface Props {
	parentMarkID: string
}

const MarkSet: React.FC<Props> = memo(({ parentMarkID }) => {
	const markSet = useRecoilValue(markMapSetState(parentMarkID))

	return (
		<ul className="MarkSet">
			{[...(markSet ?? [])].map((mark) => (
				<li key={mark.id} className="MarkSet-row">
					<MarkSetItem mark={mark} parentMarkID={parentMarkID} />
				</li>
			))}
		</ul>
	)
})

export default MarkSet
