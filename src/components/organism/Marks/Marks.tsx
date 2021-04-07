import './Marks.sass'

import React from 'react'

import rootMarkID from '../../../constants/rootMarkID'
import UpsertMark from '../../atoms/UpsertMark'
import MarkSet from '../../molecules/MarkSet'

interface Props {}

const Marks: React.FC<Props> = () => {
	return (
		<section className="Marks">
			<div className="my-5">
				<UpsertMark />
			</div>
			<MarkSet parentMarkID={rootMarkID} />
		</section>
	)
}

export default Marks
