import cl from './RouterLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers';

export enum RouterLinkTheme {
	PRIMARY ='primary'
}

interface RouterLinkProps extends LinkProps {
	theme?: RouterLinkTheme
}

export const RouterLink:FC<RouterLinkProps> = (
	{
		children,
		theme = RouterLinkTheme.PRIMARY,
		className,
		...props
	}
) => {
	return (
		<Link
			className={classNames(cl['router-link'], {}, [className, cl[theme]])}
			{...props}
		>
			{ children }
		</Link>
	);
};