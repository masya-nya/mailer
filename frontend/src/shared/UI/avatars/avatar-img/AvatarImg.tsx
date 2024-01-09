import { CSSProperties, FC } from 'react';
import cl from './AvatarImg.module.scss';

interface AvatarImgProps {
	src: string
	style?: CSSProperties
}

export const AvatarImg:FC<AvatarImgProps> = ({ src, ...props }) => {
	return (
		<div className={cl['avatar-img']} {...props} >
			<img src={src} className={cl['avatar-img__img']} />
		</div>
	);
};