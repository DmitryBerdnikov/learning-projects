import { type ReactNode } from 'react'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'
import { useTranslation } from 'react-i18next'

interface RootAppErrorBoundaryProps {
	children: ReactNode
}

export const RootAppErrorBoundary = ({ children }: RootAppErrorBoundaryProps): JSX.Element => {
	const { t } = useTranslation()

	const handleReload = (): void => {
		window.location.reload()
	}

	const fallbackContent = (
		<div>
			<h1>{t('rootError.error')}</h1>
			<button onClick={handleReload}>{t('rootError.action')}</button>
		</div>
	)

	return (
		<ErrorBoundary fallback={fallbackContent}>
			{children}
		</ErrorBoundary>
	)
}
