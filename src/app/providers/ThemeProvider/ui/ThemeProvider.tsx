import { type FC, useEffect, useState, useRef, type ReactNode } from 'react'
import { LOCAL_STORAGE_THEME_KEY, type Theme, ThemeContext } from '../lib/ThemeContext'

/*
	If user visited site for the first time, theme will be set as system theme
	If user hasn't chosen a theme, then theme won't be saved and theme will depend on theme of system
	If user has chosen a theme, theme will be saved even if current theme is equal to system theme
*/

type ThemeConfig = Record<
Theme,
{
  tag: Element | null
  defaultMediaAttributeValue: string | null
}
>

function getSystemPreferenceTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark'
}

function getInitialTheme(): Theme {
	const themeFromStorage = localStorage.getItem(
		LOCAL_STORAGE_THEME_KEY
	) as Theme

	return themeFromStorage ?? getSystemPreferenceTheme()
}

function checkIsSystemPreferenceTheme(): boolean {
	const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)

	if (savedTheme === null || savedTheme === '') {
		return false
	}

	return true
}

const initialThemeConfig: ThemeConfig = {
	light: {
		tag: null,
		defaultMediaAttributeValue: null,
	},
	dark: {
		tag: null,
		defaultMediaAttributeValue: null,
	},
	special: {
		tag: null,
		defaultMediaAttributeValue: null,
	},
}

interface ThemeProviderProps {
	children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const themeConfigRef = useRef<ThemeConfig>(initialThemeConfig)
	const [theme, _setTheme] = useState<Theme>(getInitialTheme())
	const [isSystemTheme, setIsSystemTheme] = useState(
		checkIsSystemPreferenceTheme()
	)

	const setTheme = (theme: Theme): void => {
		setIsSystemTheme(false)
		_setTheme(theme)
	}

	const setSystemTheme = (): void => {
		setIsSystemTheme(true)
		_setTheme(getSystemPreferenceTheme())
	}

	useEffect(() => {
		const init = (): void => {
			const themes = Object.keys(themeConfigRef.current) as Theme[]

			themes.forEach((iTheme) => {
				const tag = document.documentElement.querySelector(
					`style[data-theme="${iTheme}"]`
				)

				if (tag == null) {
					console.error(`Style tag for ${iTheme} theme not found`)
					return
				}

				themeConfigRef.current[iTheme] = {
					tag,
					defaultMediaAttributeValue: tag.getAttribute('media'),
				}
			})
		}

		init()
	}, [])

	useEffect(() => {
		const { current: themeConfig } = themeConfigRef
		const themes = Object.keys(themeConfigRef.current) as Theme[]

		if (isSystemTheme) {
			themes.forEach((iTheme) => {
				const { tag, defaultMediaAttributeValue } = themeConfig[iTheme]

				if (tag != null && defaultMediaAttributeValue !== null && defaultMediaAttributeValue !== '') {
					tag.setAttribute('media', defaultMediaAttributeValue)
				}
			})

			localStorage.removeItem(LOCAL_STORAGE_THEME_KEY)
			return
		}

		themes.forEach((iTheme) => {
			const { tag } = themeConfig[iTheme]

			if (tag != null) {
				const newMediaAttributeValue =
					tag.getAttribute('data-theme') === theme ? 'all' : 'not all'
				tag.setAttribute('media', newMediaAttributeValue)
			}
		})

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
	}, [theme, isSystemTheme])

	return (
		<ThemeContext.Provider
			value={{
				isSystemTheme,
				setSystemTheme,
				theme,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
