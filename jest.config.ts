import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	testEnvironment: 'jsdom',
	rootDir: './',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'\\.(css|scss|jpg|png|webp)$': '<rootDir>/fileTransformer.js',
	},
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/__mocks__/SvgMock.tsx',
		'\\module.(css|scss)$': '<rootDir>/src/shared/lib/identity-object-proxy/identity-object-proxy',
		'@app/(.*)': '<rootDir>/src/app/$1',
		'@pages/(.*)': '<rootDir>/src/pages/$1',
		'@widgets/(.*)': '<rootDir>/src/widgets/$1',
		'@features/(.*)': '<rootDir>/src/features/$1',
		'@entities/(.*)': '<rootDir>/src/entities/$1',
		'@shared/(.*)': '<rootDir>/src/shared/$1',
		'@images/(.*)': '<rootDir>/public/images/$1',
	},
}

export default jestConfig
