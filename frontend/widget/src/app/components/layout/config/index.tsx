import React from 'react';
import { CorporatePageWrapper, PersonalPageWrapper } from '../../../../pages/mail-page/index';
import { SettingsPage } from '../../../../pages/settings-page';
import { YamailerRouteT } from '../../../../shared/lib';

export enum ROUTES_NAMES {
	personal = 'personal',
	corporate = 'corporate',
	settings = 'settings'
};

export type RoutesNamesT = keyof typeof ROUTES_NAMES

export const ROUTES_CONFIG:Record<RoutesNamesT, YamailerRouteT<RoutesNamesT>> = {
	personal: {
		value: ROUTES_NAMES.personal,
		title: 'Персональная',
		Component: <PersonalPageWrapper />
	},
	corporate: {
		value: ROUTES_NAMES.corporate,
		title: 'Корпоративная',
		Component: <CorporatePageWrapper />
	},
	settings: {
		value: ROUTES_NAMES.settings,
		title: 'Настройки',
		Component: <SettingsPage />
	}
};