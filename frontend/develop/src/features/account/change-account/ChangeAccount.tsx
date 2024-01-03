import { CSSProperties, FC, useCallback } from 'react';
import cl from './ChangeAccount.module.scss';
import { Button } from 'antd';
// import { AuthContext } from 'src/entities/auth';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
// import { adaptAccountDataForDropdown } from './ChangeAccount.helper';
// import { AccountContext } from 'src/entities/account';
import { ROUTER_ROTES } from 'src/app/router/config';
const { ACCOUNT_CREATE, ACCOUNT_SELECTION } = ROUTER_ROTES;

interface ChangeAccountProps {
	className?: string;
	style?: CSSProperties;
}

export const ChangeAccount: FC<ChangeAccountProps> = observer(() => {
	const navigate = useNavigate();
	// const { store: authStore } = useContext(AuthContext);
	// // const { store: accountStore } = useContext(AccountContext);
	// const accounts = useMemo(() => authStore.accounts, [authStore]);
	// // const selectedAccount = useMemo(() => {
	// // 	return accounts.find(account => account._id === accountStore.accountId);
	// // }, [accountStore, accounts]);
	// const adaptedAccounts = useMemo(() => adaptAccountDataForDropdown(accounts), [accounts]);

	const changeAccount = useCallback(():void => {
		navigate(ACCOUNT_SELECTION);
	}, [navigate]);

	const createAccount = useCallback(():void => {
		navigate(ACCOUNT_CREATE);
	}, [navigate]);

	return (
		// <Dropdown className={cl['account-change']} menu={{ items: adaptedAccounts }} trigger={['click']} placement="bottomRight">
		// 	<Button className={cl['account-change__btn']}>{selectedAccount?.name}({ selectedAccount?.login })</Button>
		// </Dropdown>
		<div className={cl['change-account']}>
			<Button type='primary' onClick={changeAccount}>Сменить аккаунт</Button>
			<Button type='primary' onClick={createAccount}>Создать аккаунт</Button>
		</div>
	);
});
