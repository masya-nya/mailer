import { makeAutoObservable } from 'mobx';
import { FetchingEntitiesType, MailsFilterT, mailFolderT } from '../../lib/types';
import { MailContentRoutes } from '../../lib/consts';
import { BASE_MAIL_TYPES } from '../../../../entities/mail-boxes';
import { MailBox } from '../../../../shared/lib';
import { DefaultFilterValues } from '../../lib/config';
import { SelectedMailT } from '../../../../entities/mails-list';

class MailStore {
	private _mail: MailBox | null = null;
	private _isCorporate = false;
	private _mailContentRoute: MailContentRoutes = MailContentRoutes.mailsList;
	private _selectedMailIdentifier: SelectedMailT | null = null;
	private _globalMailFetchingStatus:Record<FetchingEntitiesType, boolean> = {
		folders: true,
		marks: true,
		MailBoxesCount: true,
		mails: true
	};

	private _mailsFilter:MailsFilterT = {
		path: BASE_MAIL_TYPES.inbox.value,
		pathName: BASE_MAIL_TYPES.inbox.title,
		page: DefaultFilterValues.page,
		limit: DefaultFilterValues.limit,
		filterQuery: 'all',
		filterQueryValue: true,
		dateFrom: '',
		dateTo: '',
		markId: ''
	};

	constructor () {
		makeAutoObservable(this, {}, { deep: true });
	}

	public resetSemiMailsFilter ():void {
		this.selectedMailIdentifier = null;
		this.mailsFilter = { page: DefaultFilterValues.page, dateFrom: '', dateTo: '', markId: '', filterQuery: 'all', filterQueryValue: true };
	}

	public resetFilterSettings ():void {
		this.mailsFilter = { path: BASE_MAIL_TYPES.inbox.value, pathName: BASE_MAIL_TYPES.inbox.title };
		this.resetSemiMailsFilter();
	}

	public changeMailsFolder (params:mailFolderT):void {
		this.mailsFilter = params;
		this.resetSemiMailsFilter();
	}

	public changeAllFetchingStatuses (value: boolean):void {
		(Object.keys(this._globalMailFetchingStatus) as FetchingEntitiesType[]).forEach((key) => {
			this._globalMailFetchingStatus[key] = value;
		});
	};

	public changeFetchingStatus (key:FetchingEntitiesType, value:boolean):void {
		this._globalMailFetchingStatus[key] = value;
	};

	get mail () {
		return this._mail;
	}

	set mail (newMailValue:MailBox | null) {
		console.log('SETMAIL', newMailValue);
		this._mail = newMailValue;
		this.resetFilterSettings();
	}

	get mailContentRoute () {
		return this._mailContentRoute;
	}

	set mailContentRoute (newValue: MailContentRoutes) {
		this._mailContentRoute = newValue;
	}

	get selectedMailIdentifier () {
		return this._selectedMailIdentifier;
	}

	set selectedMailIdentifier (identifiers: SelectedMailT | null) {
		this._selectedMailIdentifier = identifiers;
	}

	get isCorporate () {
		return this._isCorporate;
	}

	set isCorporate (newValue: boolean) {
		console.log('IS_CORPORATE', newValue);
		this._isCorporate = newValue;
	}

	get isMailModuleFetching ():boolean {
		return Object.values(this._globalMailFetchingStatus).reduce((acum, curent) => acum || curent, false);
	}

	get mailsFilter () {
		return this._mailsFilter;
	}

	set mailsFilter (params:MailsFilterT) {
		this._mailsFilter = { ...this._mailsFilter, ...params };
		this.mailContentRoute = MailContentRoutes.mailsList;
	}

	get mailsFilterPathValue ():string {
		return this._mailsFilter.path!;
	}

	get isMailDateFiltersClear ():boolean {
		return Boolean(this._mailsFilter.dateFrom) || Boolean(this._mailsFilter.dateTo);
	}
}

export const mailStore = new MailStore();