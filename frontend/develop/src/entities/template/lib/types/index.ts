export type TemplateT = {
	id: string,
	name: string,
	title: string,
	body: string,
	author: string,
	filesLinks: File[],
	receiver: string[],
	receiverType: number,
	isPublic: boolean,
	authorId: number,
	isSignatureUse: boolean
};

export type GroupOfTemplatesT = {
	isPublic: boolean
	title: string
	groupId: string
	templates: TemplateT[]
}

export type GroupedTemplatesT = Record<string, GroupOfTemplatesT>