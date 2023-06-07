import '@testing-library/jest-dom'

jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: (str: string) => str,
			i18n: {
				changeLanguage: async () => await new Promise(() => {}),
			},
		}
	},
	withTranslation: () => (Component: React.ComponentClass) => {
		Component.defaultProps = { ...Component.defaultProps, t: (str: string) => str }

		return Component
	},
}))
