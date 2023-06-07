import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: false,
		defaultNS: 'common',
		ns: [],
		debug: __IS_DEV__,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		detection: {
			order: [
				'querystring',
				'cookie',
				'localStorage',
				'sessionStorage',
				'navigator',
				'htmlTag',
			],

			// keys or params to lookup language from
			lookupQuerystring: 'lng',
			lookupCookie: 'i18next',
			lookupLocalStorage: 'i18nextLng',
			lookupSessionStorage: 'i18nextLng',

			// cache user language on
			caches: ['localStorage'],
		},
	}).catch((error) => {
		console.error(error)
	})

export default i18next
