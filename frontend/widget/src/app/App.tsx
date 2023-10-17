import React from 'react';
import { Layout } from './components/layout';
import { observer } from 'mobx-react-lite';

type Props = {
	isActive: boolean;
}

const App = observer(({ isActive }: Props):React.JSX.Element => {
	return (
		<>
			{isActive && <Layout />}
		</>
	);
});

export default App;