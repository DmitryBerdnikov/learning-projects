import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@app/providers/ThemeProvider'
import { RootAppErrorBoundary } from './widgets/RootAppErrorBoundary'
import App from './app/App'

import '@shared/i18n'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
	<BrowserRouter>
		{/* Suspense for i18n */}
		<Suspense fallback="">
			<RootAppErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</RootAppErrorBoundary>
		</Suspense>
	</BrowserRouter>
)
