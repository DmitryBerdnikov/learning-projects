import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = (): JSX.Element => {
	const { i18n, t } = useTranslation()

	const changeLanguageHandler = (): void => {
		const newLanguageKey = i18n.resolvedLanguage === 'en' ? 'ru' : 'en'
		i18n.changeLanguage(newLanguageKey)
		document.documentElement.lang = newLanguageKey
	}

	return (
		<button type="button" onClick={changeLanguageHandler}>
			{t('changeLanguage')}
		</button>
	)
}
