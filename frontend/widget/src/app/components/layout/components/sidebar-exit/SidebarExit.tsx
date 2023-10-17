import React from 'react';
import cl from './SidebarExit.module.scss';
import { handleApp } from '../../../../..';

const SidebarExit = ():React.JSX.Element => {
	return (
		<div onClick={() => handleApp(false)} className={cl['sidebar__exit-btn']}>
			<div className={cl['sidebar__exit-btn-inner']}>
				Выход
			</div>
		</div>
	);
};

export default SidebarExit;
