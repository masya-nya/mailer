import React from 'react';
import cl from './SidebarExit.module.scss';

const SidebarExit = ():React.JSX.Element => {
	return (
		<div className={cl['sidebar__exit-btn']}>
			<div className={cl['sidebar__exit-btn-inner']}>
				Выход
			</div>
		</div>
	);
};

export default SidebarExit;
