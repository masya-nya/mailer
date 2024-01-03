import { makeAutoObservable } from 'mobx';
import { BASE_MAIL_TYPES, baseMailBoxesValue } from 'src/entities/mail-boxes';
import { MailsFilterT, mailFolderT } from '../../lib/types';
import { DefaultFilterValues } from '../../lib/config';
import { MailContentRoutes } from '../../lib/consts';
import { SelectedMailT } from 'src/entities/mails-list';


export class EmailStore {
	private _email: string | null = null;
	
	private _mailContentRoute: MailContentRoutes = MailContentRoutes.mailsList;

	private _selectedMailIdentifier: SelectedMailT | null = null;

	private _mailsFilter:MailsFilterT = {
		path: BASE_MAIL_TYPES.inbox.value,
		pathName: BASE_MAIL_TYPES.inbox.title,
		page: DefaultFilterValues.page,
		limit: DefaultFilterValues.limit,
		filterQuery: 'all',
		filterQueryValue: true
	};

	constructor() {
		makeAutoObservable(this);
	}

	public resetSemiMailsFilter ():void {
		this.selectedMailIdentifier = null;
		this.mailsFilter = { page: DefaultFilterValues.page };
	}

	public resetFilterSettings ():void {
		this.mailsFilter = { path: BASE_MAIL_TYPES.inbox.value, pathName: BASE_MAIL_TYPES.inbox.title };
		this.resetSemiMailsFilter();
	}

	public changeMailsFolder (params:mailFolderT):void {
		this.mailsFilter = params;
		this.resetSemiMailsFilter();
	}

	get email(): string | null {
		return this._email;
	}

	set email(value: string | null) {
		this._email = value;
	}

	get path(): baseMailBoxesValue {
		return this._mailsFilter.path!;
	}

	set path(value: baseMailBoxesValue) {
		this._mailsFilter.path = value;
	}

	get mailsFilter ():MailsFilterT {
		return this._mailsFilter;
	}

	set mailsFilter (params:MailsFilterT) {
		this._mailsFilter = { ...this._mailsFilter, ...params };
	}

	get mailContentRoute ():MailContentRoutes {
		return this._mailContentRoute;
	}

	set mailContentRoute (newValue: MailContentRoutes) {
		this._mailContentRoute = newValue;
	}

	get selectedMailIdentifier (): SelectedMailT | null {
		return this._selectedMailIdentifier;
	}

	set selectedMailIdentifier (identifiers: SelectedMailT | null) {
		this._selectedMailIdentifier = identifiers;
	}

	get mailsFilterPathValue ():string {
		return this._mailsFilter.path!;
	}
}

export const emailStore = new EmailStore();