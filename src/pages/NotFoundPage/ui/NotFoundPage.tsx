import { useTranslation } from 'react-i18next'

export const NotFoundPage = (): JSX.Element => {
	const { t } = useTranslation(['notFound'])

	return <div>{t('pageTitle')}</div>
}
