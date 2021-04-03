import './UpsertMark.sass'

import classNames from 'classnames'
import React, { memo, useCallback, useEffect, useState } from 'react'
import {
	BsBookmarkFill,
	BsBookmarkPlus,
	BsFolderFill,
	BsFolderPlus,
	BsTrashFill,
} from 'react-icons/bs'
import { useRecoilCallback, useSetRecoilState } from 'recoil'

import rootMarkID from '../../constants/rootMarkID'
import createSortedMarkSet from '../../shared/mark/createSortedMarkSet'
import findMarkByID from '../../shared/mark/findMarkByID'
import mapMarkToString from '../../shared/mark/mapMarkToString'
import { parseStringToMark } from '../../shared/mark/parseStringToMark'
import matchURL from '../../shared/matchURL'
import { noop } from '../../shared/noop'
import { markMapSetState } from '../../state/markMap'

// import isEqual from 'lodash.isequal'

interface Props {
	/** Parent Mark to upsert into; defaults to `rootMarkID` if unset. */
	parentMarkID?: string
	/** Mark to update, if modifying an existing Mark. */
	markID?: string
	/** Called when upsert occurs or user stops editing Mark. */
	onDone?: () => void
}

enum Action {
	CreateLink,
	CreateFolder,
	UpdateLink,
	UpdateFolder,
	Delete,
}

// prettier-ignore
const actionIcons: Record<Action, JSX.Element> = {
	[Action.CreateLink]: <BsBookmarkPlus className="has-text-link" role="img" aria-label="New link" />,
	[Action.CreateFolder]: <BsFolderPlus className="has-text-grey-dark" role="img" aria-label="New folder" />,
	[Action.UpdateLink]: <BsBookmarkFill className="has-text-link" role="img" aria-label="Update link" />,
	[Action.UpdateFolder]: <BsFolderFill className="has-text-grey-dark" role="img" aria-label="Update folder" />,
	[Action.Delete]: <BsTrashFill className="has-text-danger" role="img" aria-label="Delete link or folder" />,
} as const

const folderActions: ReadonlyArray<Action> = [
	Action.CreateFolder,
	Action.UpdateFolder,
] as const

const UpsertMark: React.FC<Props> = memo(
	({ markID, parentMarkID = rootMarkID, onDone = noop }) => {
		const markSetRecoilState = markMapSetState(parentMarkID)
		const setMarkSet = useSetRecoilState(markSetRecoilState)

		const [inputValue, setInputValue] = useState('')
		const [originalValue, setOriginalValue] = useState('')
		const [scrollLeft, setScrollLeft] = useState(0)

		const hydrateInputValue = useRecoilCallback(
			({ snapshot }) => async (id: string) => {
				const markSet = await snapshot.getPromise(markSetRecoilState)
				const mark = findMarkByID(markSet, id)
				if (mark) {
					const markValue = mapMarkToString(mark)
					setOriginalValue(markValue)
					setInputValue(markValue)
				}
			}
		)

		useEffect(() => {
			markID != null && hydrateInputValue(markID)
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [])

		const handleUpsert = useCallback(
			(newMarkValue: string) => {
				setMarkSet((oldMarkSet = new Set()) => {
					const oldMark = findMarkByID(oldMarkSet, markID)
					const newMark = parseStringToMark(newMarkValue, oldMark?.id)
					newMark && oldMarkSet.add(newMark)
					oldMark && oldMarkSet.delete(oldMark)
					return createSortedMarkSet(oldMarkSet)
				})
			},
			[markID, setMarkSet]
		)

		const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
			inputValue === originalValue && onDone()
		}

		const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
			target: { value },
		}) => {
			setInputValue(value)
		}

		const handleSubmit = (shiftKey: unknown) => {
			if (inputValue.trim() !== originalValue) {
				handleUpsert(inputValue)
			}
			setInputValue('')
			if (shiftKey !== true) {
				onDone()
			}
		}

		const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({
			key,
			shiftKey,
		}) => {
			if (key === 'Escape') {
				onDone()
			} else if (key === 'Enter') {
				handleSubmit(shiftKey)
			}
		}

		const handleScroll: React.UIEventHandler<HTMLInputElement> = ({
			currentTarget,
		}) => {
			setScrollLeft(currentTarget.scrollLeft)
		}

		const url = matchURL(inputValue)
		let action: Action

		if (markID) {
			if (!inputValue) {
				action = Action.Delete
			} else {
				action = url ? Action.UpdateLink : Action.UpdateFolder
			}
		} else {
			action = !inputValue || url ? Action.CreateLink : Action.CreateFolder
		}

		let linkPreview = <>—</>
		if (url) {
			const [beforeURL] = inputValue.split(url)
			linkPreview = (
				<>
					{beforeURL}
					<span
						className="UpsertMark-linkPreviewLink"
						style={{ transform: `translateX(-${scrollLeft}px)` }}
					>
						{url}
					</span>
				</>
			)
		}

		return (
			<div className="is-relative">
				<div className="UpsertMark field">
					<p
						className="UpsertMark-linkPreview control is-unselectable"
						aria-hidden
					>
						{linkPreview}
					</p>

					<p className="control has-icons-left has-icons-right">
						<input
							type="text"
							className={classNames('UpsertMark-input input', {
								'has-text-weight-medium': folderActions.includes(action),
							})}
							value={inputValue}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							onBlur={handleBlur}
							onScroll={handleScroll}
							placeholder="Name and link, or folder name"
							autoCapitalize="true"
							autoFocus
						/>

						<span className="UpsertMark-icon icon is-left">
							{actionIcons[action]}
						</span>
						<span
							className="UpsertMark-icon icon is-right is-clickable"
							onClick={handleSubmit}
							role="button"
							aria-label="Save"
							tabIndex={0}
						>
							⏎
						</span>
					</p>
				</div>
			</div>
		)
	}
)

export default UpsertMark
