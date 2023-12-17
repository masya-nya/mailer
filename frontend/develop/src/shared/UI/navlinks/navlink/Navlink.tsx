import { CSSProperties, FC } from 'react';
import cl from './Navlink.module.scss';
import { Link, useMatch } from 'react-router-dom';
import cn from 'classnames';

interface NavlinkProps {
	to: string;
	children: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}

export const Navlink: FC<NavlinkProps> = ({ to, children, ...props }) => {
	const isMatch = useMatch(to);
	return (
		<Link
			{...props}
			to={to}
			className={cn(cl['navlink'], { [cl['navlink__active']]: isMatch })}
		>
			{children}
		</Link>
	);
};
