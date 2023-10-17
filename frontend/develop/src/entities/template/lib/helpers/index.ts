import { TemplateT, GroupedTemplatesT } from '../types';

export const groupingTemplates = (templates:TemplateT[]):GroupedTemplatesT => {
	const groupedTemplates:GroupedTemplatesT = {};
	templates.forEach(template => {
		if (template.isPublic) {
			if (!groupedTemplates['public']) {
				groupedTemplates['public'] = {
					isPublic: true,
					groupId: 'public',
					title: 'Общедоступные',
					templates: []
				};
			}
			groupedTemplates['public'].templates.push({ ...template });
		} else {
			if (!groupedTemplates[template.authorId]) {
				groupedTemplates[template.authorId] = {
					isPublic: false,
					groupId: template.authorId.toString(),
					title: template.author,
					templates: []
				};
			}
			groupedTemplates[template.authorId].templates.push({ ...template });
		}
	});
	return groupedTemplates;
};