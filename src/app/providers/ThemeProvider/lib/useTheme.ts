import { useContext } from 'react'
import { type Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
  theme: Theme
  isSystemTheme: boolean
  setLightTheme: () => void
  setDarkTheme: () => void
  setBrightTheme: () => void
  setSystemTheme: () => void
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme, isSystemTheme, setSystemTheme } =
		useContext(ThemeContext)

	const setLightTheme = (): void => {
		setTheme('light')
	}

	const setDarkTheme = (): void => {
		setTheme('dark')
	}

	const setBrightTheme = (): void => {
		setTheme('special')
	}

	return {
		theme,
		isSystemTheme,
		setLightTheme,
		setDarkTheme,
		setBrightTheme,
		setSystemTheme,
	}
}
