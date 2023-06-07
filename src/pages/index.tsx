import { Route, Routes } from 'react-router-dom'
import { RoutePath } from '@shared/routes'
import { lazyImport } from '@shared/lib/lazyImport'

const { AboutPage } = lazyImport(async () => await import('@pages/AboutPage'), 'AboutPage')
const { MainPage } = lazyImport(async () => await import('@pages/MainPage'), 'MainPage')
const { NotFoundPage } = lazyImport(async () => await import('@pages/NotFoundPage'), 'NotFoundPage')

export const Routing = (): JSX.Element => (
	<Routes>
		<Route path={RoutePath.about} element={<AboutPage />} />
		<Route path={RoutePath.main} element={<MainPage />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
)
