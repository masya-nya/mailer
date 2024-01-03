import { CSSProperties, FC } from 'react';
import cl from './GroupedNavlinks.module.scss';
import { NavlinkI } from '../types';
import { Navlink } from '../navlink/Navlink';

interface GroupedNavlinksProps {
	title: string;
	links: NavlinkI[];
	className?: string;
	style?: CSSProperties;
}

export const GroupedNavlinks: FC<GroupedNavlinksProps> = ({
	title,
	links,
	...props
}) => {
	return (
		<div {...props} className={cl['grouped-navlink']}>
			<div className={cl['grouped-navlink__title']}>{title}</div>
			<div className={cl['grouped-navlink__links']}>
				{links.map(({ to, title, icon }) => (
					<Navlink key={to} to={to}>
						{icon || null}
						<span style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}} >
							{title}
						</span>
					</Navlink>
				))}
			</div>
		</div>
	);
};
