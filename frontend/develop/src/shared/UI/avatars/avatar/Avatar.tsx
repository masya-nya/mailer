import React from 'react';
import cl from './Avatar.module.scss';

type AvatarProps = {
	src: string
	title?: string
	style?: React.CSSProperties
}

export const Avatar = ({ src, ...props }:AvatarProps):React.JSX.Element => {
	return (
		<div className={cl['avatar']} {...props} >
			<img src={src} className={cl['avatar__img']} />
		</div>
	);
};