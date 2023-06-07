import React, { useState } from 'react'
import { useTranslation, withTranslation, type WithTranslation } from 'react-i18next'
import AttentionYellowIcon from '@images/attention_yellow.svg'
import chromeImageSrc from '@images/chrome.png'
import edgeImageSrc from '@images/edge.jpg'
import styles from './TestComponent.module.scss'
// using only for test case to differ css modules and simple styles
import notCssModulesStyles from './styles.scss'

export const TestComponent = (): JSX.Element => {
	const [isVisible, setIsVisible] = useState(true)
	const { t } = useTranslation('common')

	const asyncToggleVisibility = async (): Promise<void> => {
		await Promise.resolve()
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(null)
			}, 100)
		})
		setIsVisible(prevState => !prevState)
	}

	const handleClick = (): void => {
		asyncToggleVisibility()
	}

	return (
		<div className={styles.testComponent}>
			{/* eslint-disable-next-line i18next/no-literal-string */}
			{!isVisible && <div>hidden</div>}
			<div className={notCssModulesStyles.testComponent}></div>
			<AttentionYellowIcon />
			<img src={chromeImageSrc} alt="" />
			<img src={edgeImageSrc} alt="" />
			<button className={styles.button} data-testid="toggle-button" onClick={handleClick}>{t('changeLanguage')}</button>
			<div className={styles.text} data-testid="view" style={{ display: isVisible ? 'block' : 'none' }}></div>
		</div>
	)
}

interface TestComponentsClassState {
	isVisible: boolean
}

interface TestComponentsClassProps extends WithTranslation {};

class TestComponentClassTemplate extends React.Component<TestComponentsClassProps, TestComponentsClassState> {
	state: TestComponentsClassState = {
		isVisible: true,
	}

	handleClick(): void {
		this.setState((prevState) => ({ ...prevState, isVisible: !prevState.isVisible }))
	}

	render(): JSX.Element {
		return (
			<div>
				<button data-testid="toggle-button" onClick={() => { this.handleClick() }}>{this.props.t('changeLanguage')}</button>
				<div data-testid="view" style={{ display: this.state.isVisible ? 'block' : 'none' }}></div>
			</div>
		)
	}
}

export const TestComponentClass = withTranslation()(TestComponentClassTemplate)
