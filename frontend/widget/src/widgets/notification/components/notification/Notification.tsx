import React, { useEffect, useState } from 'react';
import cl from './Notification.module.scss';
import cn from 'classnames';
import { DURATIONS } from '../../../../entities/notification';
import { ONE_SECOND } from '../../../../shared/lib';

type NotificationProps = {
	title: string
	text: string | string[]
	type: 'warning' | 'danger' | 'primary'
}

const Notification = ({ title, text, type }:NotificationProps):React.JSX.Element => {
	const [slideClass, setSlideClass] = useState('');

	useEffect(() => {
		setSlideClass('notification--slide');
		setTimeout(() => {
			setSlideClass('notification--unslide');
		}, (DURATIONS.view_duration) * ONE_SECOND);
	}, []);

	return (
		<div style={{ transition: `all ${DURATIONS.slide_duration}s ease` }} className={cn(cl['notification'], cl[slideClass], cl[`notification--${type}`])}>
			<div className={cl['notification__title']}>
				{ title }
			</div>
			<div className={cl['notification__text']}>
				{
					typeof text === 'string'
						? text
						: text.map(item => <span key={item} >{ item }</span>)
				}
			</div>
		</div>
	);
};

export default Notification;
