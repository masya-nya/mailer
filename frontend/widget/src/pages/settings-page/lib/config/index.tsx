import React from 'react';
import { YamailerRouteT } from '../../../../shared/lib';
import { UserRights } from '../../../../widgets/settings';

export enum SettingsRoutes {
	rights = 'rights'
}

export type SettingsRoutesT = keyof typeof SettingsRoutes;

export const SETTINGS_PAGE_CONF:Record<SettingsRoutesT, YamailerRouteT<SettingsRoutesT>> = {
	rights: {
		title: 'права',
		value: SettingsRoutes.rights,
		Component: <UserRights />
	}
};