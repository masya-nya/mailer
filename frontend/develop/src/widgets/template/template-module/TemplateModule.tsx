import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import cl from './TemplateModule.module.scss';
import TemplateContent from './components/template-content/TemplateContent';
import TemplateSidebar from './components/template-sidebar/TemplateSidebar';
import { TEMPLATES_MOCK } from '../../../entities/template/lib/mock';
import { TemplateT, groupingTemplates } from '../../../entities/template';

export const TemplateModule = ():React.JSX.Element => {
	const [templates, setTemplates] = useState<TemplateT[]>(TEMPLATES_MOCK);
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateT | null>(templates[0] || null);

	const groupedTemplates = useMemo(() => {
		const filteredTemplates = templates.filter(template => template.name.toLowerCase().includes(searchValue.toLowerCase()));
		return groupingTemplates(filteredTemplates);
	}, [templates, searchValue]);

	const searchingTemplateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const setSelectedTemplateHandler = (newTemplate: TemplateT) => {
		if (newTemplate.id !== selectedTemplate?.id) {
			setSelectedTemplate(newTemplate);
		}
	};

	useEffect(() => {
		if (TEMPLATES_MOCK) {
			setTemplates(TEMPLATES_MOCK);
		}
	}, [TEMPLATES_MOCK]);
	return (
		<div className={cl['template-module']}>
			<TemplateSidebar
				selectedTemplate={selectedTemplate}
				setSelectedTemplate={setSelectedTemplateHandler}
				groupedTemplates={groupedTemplates}
				searchingTemplateHandler={searchingTemplateHandler}
			/>
			<TemplateContent selectedTemplate={selectedTemplate} />
		</div>
	);
};
