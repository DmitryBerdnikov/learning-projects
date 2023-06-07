import { createContext } from 'react'

export type Theme = 'light' | 'dark' | 'special'

export interface ThemeContextProps {
	theme: Theme
	isSystemTheme: boolean
	setSystemTheme: () => void
	setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>(
	{} as ThemeContextProps
)

export const LOCAL_STORAGE_THEME_KEY = 'theme'
