import React from 'react';
import { YamailerRouteT } from '../../../../shared/lib';
import { UserRights } from '../../../../widgets/settings';
import { TemplateModule } from '../../../../widgets/template';

export enum SettingsRoutes {
	rights = 'rights',
	templates = 'templates'
}

export type SettingsRoutesT = keyof typeof SettingsRoutes;

export const SETTINGS_PAGE_CONF:Record<SettingsRoutesT, YamailerRouteT<SettingsRoutesT>> = {
	rights: {
		title: 'права',
		value: SettingsRoutes.rights,
		Component: <UserRights />
	},
	templates: {
		title: 'шаблоны',
		value: SettingsRoutes.templates,
		Component: <TemplateModule />
	}
};