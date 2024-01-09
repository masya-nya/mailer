import { FC } from 'react';
import cl from './Loader.module.scss';
import { CSSProperties } from 'react';

type LoaderProps = {
	className?: string
	style?: CSSProperties
}

export const Loader :FC<LoaderProps> = ({ ...props }: LoaderProps)=> {
	return (
		<div className={cl['loader-container']}>
			<span {...props} className={cl['loader']}></span>
		</div>
	);
};