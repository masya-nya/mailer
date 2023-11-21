import { AccountInstallDto } from '../../modules/account/dto/account-install.dto';
import { AccountUninstallDto } from '../../modules/account/dto/account-uninstall.dto';
import axios from 'axios';

export async function redirectAccountInfoToExternal(url: string, data: AccountInstallDto | AccountUninstallDto): Promise<void> {
    await axios.post(url, data);
}
