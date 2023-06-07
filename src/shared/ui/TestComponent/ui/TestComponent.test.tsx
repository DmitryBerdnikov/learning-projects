import { fireEvent, screen, render } from '@testing-library/react'
import { TestComponent, TestComponentClass } from './TestComponent'

describe('Functional TestComponent', () => {
	test('toggle visibility', async () => {
		render(<TestComponent />)
		const toggleBtn = screen.getByTestId('toggle-button')
		expect(screen.getByTestId('view')).toBeVisible()
		fireEvent.click(toggleBtn)
		await screen.findByText('hidden')
		expect(screen.getByTestId('view')).not.toBeVisible()
	})
})

describe('Class TestComponent', () => {
	test('toggle visibility', () => {
		render(<TestComponentClass />)
		const toggleBtn = screen.getByTestId('toggle-button')
		expect(screen.getByTestId('view')).toBeVisible()
		fireEvent.click(toggleBtn)
		expect(screen.getByTestId('view')).not.toBeVisible()
	})
})
