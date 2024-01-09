import { CSSProperties, FC } from 'react';
import cl from './LogoMain.module.scss';
import { LogoSvg } from 'src/shared/svg/logo-svg/LogoSvg';

interface LogoMainProps {
	className?: string;
	style?: CSSProperties;
}

export const LogoMain: FC<LogoMainProps> = ({ ...props }) => {
	return (
		<div {...props} className={cl['logo-main']}>
			<LogoSvg height='36px' width='36px' className={cl['logo-main__svg']} />
			<span className={cl['logo-main__name']}>Mailer</span>
		</div>
	);
};
