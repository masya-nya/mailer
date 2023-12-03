import { CSSProperties, FC } from 'react';

interface HomePageProps {
	className?: string
	style?: CSSProperties
}

export const HomePage:FC<HomePageProps> = () => {
	return (
		<div>
			HomePage
		</div>
	);
};