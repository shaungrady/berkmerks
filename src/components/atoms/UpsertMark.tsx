import './UpsertMark.sass'

import classNames from 'classnames'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import {
	BsBookmarkFill,
	BsBookmarkPlus,
	BsFolderFill,
	BsFolderPlus,
} from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRecoilCallback, useSetRecoilState } from 'recoil'

import rootMarkID from '../../constants/rootMarkID'
import mapMarkToString from '../../shared/mark/mapMarkToString'
import parseMarkInput from '../../shared/mark/parseMarkInput'
import matchURL from '../../shared/matchURL'
import noop from '../../shared/noop'
import { markStateFamily } from '../../state/marks'

// import isEqual from 'lodash.isequal'

interface Props {
	/** Parent Mark to upsert into; defaults to `rootMarkID` if unset. */
	parentID?: string
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
	[Action.Delete]: <RiDeleteBin6Line className="has-text-danger" role="img" aria-label="Delete link or folder" />,
} as const

const folderActions: ReadonlyArray<Action> = [
	Action.CreateFolder,
	Action.UpdateFolder,
] as const

const UpsertMark: React.FC<Props> = ({
	markID = '',
	parentID = rootMarkID,
	onDone = noop,
}) => {
	const markRecoilState = markStateFamily(markID)

	const setMark = useSetRecoilState(markRecoilState)

	const inputEl = useRef<HTMLInputElement>(null)
	const [inputValue, setInputValue] = useState('')
	const [originalValue, setOriginalValue] = useState('')
	const [scrollLeft, setScrollLeft] = useState(0)

	const hydrateInputValue = useRecoilCallback(({ snapshot }) => async () => {
		const mark = await snapshot.getPromise(markRecoilState)
		if (mark) {
			const markValue = mapMarkToString(mark)
			setOriginalValue(markValue)
			setInputValue(markValue)

			if (inputEl.current && mark.url) {
				const urlIndex = markValue.indexOf(mark.url)
				inputEl.current.selectionStart = urlIndex
				inputEl.current.selectionEnd = urlIndex + mark.url.length
			}
		}
	})

	useEffect(() => {
		hydrateInputValue()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleUpsert = useCallback(
		(newMarkValue: string) => {
			setMark((oldMark) => {
				if (oldMark) {
					return parseMarkInput(newMarkValue, oldMark)
				} else {
					const partialMark = parseMarkInput(newMarkValue)
					return partialMark ? { ...partialMark, parentID, id: '' } : undefined
				}
			})
		},
		[parentID, setMark]
	)

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target: { value },
	}) => setInputValue(value)

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

	const handleBlur: React.FocusEventHandler<HTMLInputElement> = () =>
		inputValue === originalValue && onDone()

	const handleScroll: React.UIEventHandler<HTMLInputElement> = ({
		currentTarget,
	}) => setScrollLeft(currentTarget.scrollLeft)

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
						ref={inputEl}
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

UpsertMark.displayName = `UpsertMark`

export default memo(UpsertMark)
