import { SelectedMailT } from '../../../mails-list/lib/types';

export type SendDataType = {
	emailTo: string[]
	references: SelectedMailT[]
	subject: string
	text: string
	html: string
	files: File[]
}