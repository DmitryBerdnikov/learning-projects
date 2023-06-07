import { classNames } from './classNames'

describe('classNames', () => {
	test('with only first param', () => {
		expect(classNames('someClass')).toBe('someClass')
	})

	test('with additional class', () => {
		const expected = 'someClass class1 class2'
		expect(classNames('someClass', {}, ['class1', 'class2']))
			.toBe(expected)
	})

	describe('with mods', () => {
		test('truthy values', () => {
			const expected = 'someClass hovered scrollable'
			expect(classNames(
				'someClass',
				{ hovered: true, scrollable: true }
			)).toBe(expected)
		})

		test('falsy values', () => {
			const expected = 'someClass'
			expect(classNames(
				'someClass',
				{ hovered: null, scrollable: false, visible: undefined }
			)).toBe(expected)
		})
	})
})
