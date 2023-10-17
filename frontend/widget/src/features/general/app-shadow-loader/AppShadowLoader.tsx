import React from 'react';
import { LoaderCircle, ShadowLoaderWrapper } from '../../../shared/UI';
import { appShadowLoaderStore } from './model/store/app-shadow-loader.store';
import { observer } from 'mobx-react-lite';

export const AppShadowLoader = observer((): React.JSX.Element => {
	console.log(appShadowLoaderStore.isLoading);
	if (appShadowLoaderStore.isLoading) {
		return <ShadowLoaderWrapper translucent ><LoaderCircle /></ShadowLoaderWrapper>;
	}
	return (<></>);
});
