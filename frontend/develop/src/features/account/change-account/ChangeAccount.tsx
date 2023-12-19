import { CSSProperties, FC, useContext, useMemo } from 'react';
import cl from './ChangeAccount.module.scss';
import { Dropdown, Button } from 'antd';
import { AuthContext } from 'src/entities/auth';
import { observer } from 'mobx-react-lite';
import { adaptAccountDataForDropdown } from './ChangeAccount.helper';
import { AccountContext } from 'src/entities/account';

interface ChangeAccountProps {
	className?: string;
	style?: CSSProperties;
}

export const ChangeAccount: FC<ChangeAccountProps> = observer(() => {
	const { store: authStore } = useContext(AuthContext);
	const { store: accountStore } = useContext(AccountContext);
	const accounts = useMemo(() => authStore.accounts, [authStore]);
	const selectedAccount = useMemo(() => {
		return accounts.find(account => account._id === accountStore.accountId);
	}, [accountStore, accounts]);
	const adaptedAccounts = useMemo(() => adaptAccountDataForDropdown(accounts), [accounts]);
	console.log('adapted', adaptedAccounts);

	return (
		<Dropdown className={cl['account-change']} menu={{ items: adaptedAccounts }} trigger={['click']} placement="bottomRight">
			<Button className={cl['account-change__btn']}>{selectedAccount?.name}({ selectedAccount?.login })</Button>
		</Dropdown>
	);
});
