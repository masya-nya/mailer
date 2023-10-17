import { makeAutoObservable } from 'mobx';
import { ServerMailT } from '../../../mails-list/lib/types';
class SendMailStore {
	private _mailTo:string[] = [];
	private _references: ServerMailT[] = [];

	constructor () {
		makeAutoObservable(this);
	}

	public clearPrevOptions () {
		this._mailTo = [];
		this._references = [];
	}

	get mailTo () {
		return this._mailTo;
	}

	set mailTo (newValue: string[]) {
		this._mailTo = newValue;
	}

	get references () {
		return this._references;
	}

	set references (newValue: ServerMailT[]) {
		this._references = newValue;
	}
}

export const sendMailStore = new SendMailStore();