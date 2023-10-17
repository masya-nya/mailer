import React from 'react';
import cl from './ErrorWindow.module.scss';

type ErrorWindowProps = {
	title: string
	messages: string[] | undefined
}

export const ErrorWindow = ({ title, messages }: ErrorWindowProps): React.JSX.Element => {
	const errorMessages = (): React.ReactNode | null => {
		if (!messages) {
			return null;
		}
		if (Array.isArray(messages)) {
			return <div className={cl['error-window__messages']}>
				{
					messages.map(message => <div className={cl['error-window__message']} key={message}>{message}</div>)
				}
			</div>;
		}
		return <div className={cl['error-window__message']} >{messages}</div>;
	};

	return (
		<div className={cl['error-window']}>
			<div className={cl['error-window__body']}>
				<div className={cl['error-window__title']}>{title}</div>
				{errorMessages()}
			</div>
		</div>
	);
};
