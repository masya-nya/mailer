import { MenuProps } from 'antd';
import { AccountPopulateI } from 'src/entities/account';

export const adaptAccountDataForDropdown = (accounts: AccountPopulateI[]): MenuProps['items'] => {
	const adaptedAccount = accounts.map((account) => {
		return {
			key: account._id,
			label: <a onClick={() => console.log(account._id)}>{ account.name }</a>
		};
	});
	return [
		...adaptedAccount,
		{
			key: 'new',
			label: <a onClick={() => console.log('new')}>Создать аккаунт +</a>
		}
	];
};