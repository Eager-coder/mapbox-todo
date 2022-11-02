import React, { InputHTMLAttributes, KeyboardEvent, MouseEvent, useEffect, useState } from "react"
import cn from "classnames"

interface Item {
	text: string
	completed: boolean
	id: number
}

const App: React.FC = () => {
	const [inputText, setInputText] = useState("")
	const [items, setItems] = useState<Item[]>([])
	const [displayListType, setDisplayListType] = useState<"all" | "active" | "completed">("all")
	const [displayItems, setDisplayItems] = useState(items)

	useEffect(() => {
		if (displayListType === "all") {
			setDisplayItems(items)
		} else if (displayListType === "active") {
			setDisplayItems(items.filter(item => !item.completed))
		} else {
			setDisplayItems(items.filter(item => item.completed))
		}
	}, [items, displayListType, inputText])

	const toggleCompleted = (item: Item, event: InputHTMLAttributes<HTMLInputElement>) => {
		setItems(prev =>
			prev.map(each => {
				if (each.id === item.id) {
					return { ...each, completed: !each.completed }
				}
				return each
			}),
		)
	}

	const addItemUsingKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputText.trim().length) {
			const newList = items
			newList.push({
				text: inputText,
				completed: false,
				id: items.length ? items[items.length - 1].id + 1 : 1,
			})
			setItems(newList)
			setInputText("")
		}
	}

	const addItemUsingButton = (e: MouseEvent<HTMLButtonElement>) => {
		if (inputText.trim().length) {
			const newList = items
			newList.push({
				text: inputText,
				completed: false,
				id: items.length ? items[items.length - 1].id + 1 : 1,
			})
			setItems(newList)
			setInputText("")
		}
	}

	const clearCompleted = () => {
		setItems(prev => prev.filter(item => !item.completed))
	}

	return (
		<div className="App">
			<div className="border w-[492px] m-auto mt-20">
				<h1 className="text-5xl text-center mb-8 mt-2">Todos</h1>
				<div className="border w-full flex">
					<input
						data-testid="input-add"
						className="w-full h-10 pl-8"
						placeholder="New to do"
						value={inputText}
						onKeyDown={e => addItemUsingKey(e)}
						onChange={e => setInputText(e.target.value)}
						type="text"
						name=""
						id=""
					/>
					<button data-testid="button-add" className="border px-3" onClick={e => addItemUsingButton(e)}>
						Add
					</button>
				</div>

				<ul>
					{displayItems.map(item => (
						<li data-testid={"item-" + item.id} className="pl-8 my-3" key={item.id}>
							<input
								className="mr-4"
								checked={item.completed}
								onChange={e => toggleCompleted(item, e)}
								type="checkbox"
								name="checking"
								data-testid={"item-checkbox-" + item.id}
							/>
							<span
								className={cn("break-all", {
									"line-through": item.completed,
								})}>
								{item.text}
							</span>
						</li>
					))}
				</ul>

				<div className="border px-8 py-4 flex justify-between">
					{items.filter(item => !item.completed).length ? (
						<span>{items.filter(item => !item.completed).length} items left</span>
					) : null}
					<div>
						<button
							className={cn("h-max text-xs px-2 py-1 mx-1 border-2 rounded-md", {
								"border-green-400": displayListType === "all",
								"border-transparent": displayListType !== "all",
							})}
							onClick={() => setDisplayListType("all")}>
							All
						</button>
						<button
							className={cn("h-max text-xs px-2 py-1 mx-1 border-2 rounded-md", {
								"border-green-400": displayListType === "active",
								"border-transparent": displayListType !== "active",
							})}
							onClick={() => setDisplayListType("active")}>
							Active
						</button>
						<button
							className={cn("h-max text-xs px-2 py-1 mx-1 border-2 rounded-md", {
								"border-green-400": displayListType === "completed",
								"border-transparent": displayListType !== "completed",
							})}
							onClick={() => setDisplayListType("completed")}>
							Completed
						</button>
					</div>
					<button
						data-testid="button-clear-completed"
						onClick={clearCompleted}
						className={cn("h-max text-xs mx-2 border p-2")}>
						Clear completed
					</button>
				</div>
			</div>
		</div>
	)
}

export default App
