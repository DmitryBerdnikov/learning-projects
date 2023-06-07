import { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@app/providers/ThemeProvider'
import { Routing } from '@pages/index'
import { Header } from '@widgets/Header'
import { LanguageSwitcher } from '@features/LanguageSwitcher'
import './styles/index.scss'

const ThemeSwitcher = (): JSX.Element => {
	const {
		theme,
		isSystemTheme,
		setDarkTheme,
		setLightTheme,
		setBrightTheme,
		setSystemTheme,
	} = useTheme()
	const { t } = useTranslation('common')

	return (
		<div>
			{t('currentTheme')} {isSystemTheme ? 'auto' : theme}
			<button type="button" onClick={setSystemTheme}>
				{t('themes.auto')}
			</button>
			<button type="button" onClick={setLightTheme}>
				{t('themes.light')}
			</button>
			<button type="button" onClick={setBrightTheme}>
				{t('themes.bright')}
			</button>
			<button type="button" onClick={setDarkTheme}>
				{t('themes.dark')}
			</button>
		</div>
	)
}

const App = (): JSX.Element => {
	const { i18n, t } = useTranslation()

	useEffect(() => {
		i18n.on('initialized', () => {
			document.documentElement.lang = i18n.resolvedLanguage
		})
	}, [])

	return (
		<div className="app">
			<Header />
			<ThemeSwitcher />
			<LanguageSwitcher />
			<Suspense fallback={<div>{t('loading')}</div>}>
				<Routing />
			</Suspense>
		</div>
	)
}

export default App
