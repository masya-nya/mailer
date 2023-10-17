import React from 'react';
import cl from './Loader.module.scss';

export const Loader = ():React.JSX.Element => {
	return (
		<div className={cl['loader-container']}>
			<div className={cl['loader']}></div>
		</div>
	);
};
