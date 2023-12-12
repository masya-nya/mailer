import { CSSProperties, FC, useContext } from 'react';
import cl from './GlobalShadowLoader.module.scss';
import { GlobalShadowLoaderContext, Loader } from '..';
import { observer } from 'mobx-react-lite';

interface GlobalShadowLoaderProps {
	className?: string;
	style?: CSSProperties;
}

export const GlobalShadowLoader: FC<GlobalShadowLoaderProps> = observer(() => {
	const { store } = useContext(GlobalShadowLoaderContext);
	return (
		<>
			{
				store.isLoad && <div className={cl['global-shadow-loader']}>
					<Loader />
				</div>
			}
		</>
		
	);
});
