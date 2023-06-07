import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RoutePath } from '@shared/routes'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
	const { t } = useTranslation('common')

	return (
		<div>
			<ul className={styles.menuList}>
				<li>
					<Link to={RoutePath.main}>{t('header.navigation.main')}</Link>
				</li>
				<li>
					<Link to={RoutePath.about}>{t('header.navigation.about')}</Link>
				</li>
			</ul>
		</div>
	)
}
