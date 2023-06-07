import { lazy, type ComponentType } from 'react'

// https://github.com/facebook/react/issues/14603#issuecomment-726551598

/** Util to import named export */
export function lazyImport<
	T extends ComponentType,
	I extends { [K2 in K]: T },
	K extends keyof I
>(factory: () => Promise<I>, name: K): I {
	return Object.create({
		[name]: lazy(async () => await factory().then((module) => ({ default: module[name] }))),
	})
}
