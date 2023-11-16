import { classNames } from 'shared/lib/helpers';
import cl from './Sidebar.module.scss';
import { CSSProperties, FC, useState } from 'react';

interface SidebarProps {
	className?: string
	style?: CSSProperties
}

export const Sidebar:FC<SidebarProps> = ({ className }) => {
	const [collapsed, setCollapsed] = useState(false);

	const setCollapsedHandler = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div
			className={
				classNames(
					cl['sidebar'],
					{
						[cl['sidebar--collapsed']]: collapsed
					},
					[className]
				)
			}
		>
			<button onClick={setCollapsedHandler}>COLLAPSED</button>
		</div>
	);
};