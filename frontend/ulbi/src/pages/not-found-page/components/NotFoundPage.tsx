import cl from './NotFoundPage.module.scss';
import { CSSProperties, FC } from 'react';

interface NotFoundPageProps {
	className?: string;
	style?: CSSProperties;
}

export const NotFoundPage: FC<NotFoundPageProps> = () => {
	return <div className={cl['']}>Page Not Found</div>;
};
