import './Marks.sass'

import React from 'react'

import rootMarkID from '../../../constants/rootMarkID'
import UpsertMarkV2 from '../../atoms/UpsertMark'
import MarkSet from '../../molecules/MarkSet'

interface Props {}

const Marks: React.FC<Props> = () => {
	return (
		<section className="Marks">
			<div className="my-5">
				<UpsertMarkV2 />
			</div>
			<MarkSet parentMarkID={rootMarkID} />
		</section>
	)
}

export default Marks
