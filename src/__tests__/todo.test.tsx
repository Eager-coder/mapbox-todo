import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import App from "../App"

const todoItems = ["Buy milk and bread", "Do homework", "Go jogging"]

afterEach(() => {
	cleanup()
})

test("render <App/>", () => {
	render(<App />)
})

test("insert 1 todo item to the list", () => {
	render(<App />)
	const buttonElement = screen.getByTestId("button-add")
	const inputElement = screen.getByTestId("input-add")
	fireEvent.change(inputElement, { target: { value: todoItems[0] } })
	fireEvent.click(buttonElement)
	expect(screen.getByText(todoItems[0])).toBeInTheDocument()
})

test("clear a completed item", () => {
	render(<App />)
	const addItemButtonElement = screen.getByTestId("button-add")
	const inputElement = screen.getByTestId("input-add")

	fireEvent.change(inputElement, { target: { value: todoItems[0] } })
	fireEvent.click(addItemButtonElement)
	fireEvent.change(inputElement, { target: { value: todoItems[1] } })
	fireEvent.click(addItemButtonElement)
	fireEvent.change(inputElement, { target: { value: todoItems[2] } })
	fireEvent.click(addItemButtonElement)

	const checkbox = screen.getByTestId("item-checkbox-3")
	fireEvent.click(checkbox)
	fireEvent.click(screen.getByTestId("button-clear-completed"))
	expect(screen.queryByText(todoItems[1])).toBeInTheDocument()
	expect(screen.queryByText(todoItems[2])).toBeNull()
})
