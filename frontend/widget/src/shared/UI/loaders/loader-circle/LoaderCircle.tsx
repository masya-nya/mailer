import React from 'react';
import cl from './LoaderCircle.module.scss';

export const LoaderCircle = ():React.JSX.Element => {
	return (
		<div className={cl['loader-circle-container']}>
			<span className={cl['loader-circle']}></span>
		</div>
	);
};
