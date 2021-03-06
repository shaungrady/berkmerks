import React from 'react'
import { BsBookmarks } from 'react-icons/bs'
import { RecoilRoot } from 'recoil'

import Marks from './components/organism/Marks/Marks'

function App() {
	const loading = (
		<progress className="progress is-small is-primary my-6" max="100" />
	)

	return (
		<RecoilRoot>
			<div className="section">
				<header className="container">
					<h1 className="title is-uppercase">
						<span className="icon mx-1">
							<BsBookmarks role="image" aria-label="bookmarks" />
						</span>
						Berkmerks
					</h1>
				</header>
				<div className="container">
					<React.Suspense fallback={loading}>
						<Marks />
					</React.Suspense>
				</div>
			</div>
		</RecoilRoot>
	)
}

export default App
