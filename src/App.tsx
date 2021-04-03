import React from 'react'
import { BsBookmarks } from 'react-icons/bs'
import { RecoilRoot } from 'recoil'

import Marks from './components/organism/Marks/Marks'

function App() {
	return (
		<RecoilRoot>
			<div className="section">
				<header className="container">
					<h1 className="title is-uppercase">Berkmerks</h1>
					<h2 className="subtitle">
						Simple
						<span className="icon mx-1">
							<BsBookmarks role="image" aria-label="bookmarks" />
						</span>
						for simple people.
					</h2>
				</header>
				<div className="container">
					<React.Suspense fallback={<b>Loading…</b>}>
						<Marks />
					</React.Suspense>
				</div>
			</div>
		</RecoilRoot>
	)
}

export default App
