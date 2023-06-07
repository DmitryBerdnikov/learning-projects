import { useTranslation } from 'react-i18next'
import styles from './AboutPage.module.scss'

export const AboutPage = (): JSX.Element => {
	const { t } = useTranslation(['about'])

	return <div className={styles.content}>{t('pageTitle')}</div>
}
