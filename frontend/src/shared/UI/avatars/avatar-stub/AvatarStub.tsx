import React from 'react';
import cl from './AvatarStub.module.scss';
import { getInitials, hashing } from './avatar-stub.helper';
import { MAIN_PALETTE } from '../../../lib/consts';

type AvatarStubProps = {
	name: string
	address: string
	style?: React.CSSProperties
}

export const AvatarStub = ({ name, address, style }:AvatarStubProps):React.JSX.Element => {
	const color = MAIN_PALETTE[(hashing(address) % MAIN_PALETTE.length)];
	return (
		<div className={cl['avatar-stub']} style={{ ...style, background: color }}>
			<span className={cl['avatar-stub__inner']} style={{ color, filter: 'brightness(50%) contrast(200%)' }} >
				{
					getInitials(name || address)
				}
			</span>
		</div>
	);
};