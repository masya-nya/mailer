import React, { useMemo } from 'react';
import cl from './TemplateSidebarGroup.module.scss';
import { GroupOfTemplatesT, TemplateT } from '../../../../../entities/template';
import TemplateSidebarItem from '../template-sidebar-item/TemplateSidebarItem';
import { IS_ADMIN, USER_ID } from '../../../../../shared/lib';

type TemplateSidebarGroupProps = {
	selectedTemplate: TemplateT | null
	setSelectedTemplate: (newTemplate: TemplateT) => void
	groupOfTemplates: GroupOfTemplatesT
}

const TemplateSidebarGroup = ({ groupOfTemplates, selectedTemplate, setSelectedTemplate }:TemplateSidebarGroupProps):React.JSX.Element => {
	const isShowGroup = useMemo(() => {
		const { templates, isPublic, groupId } = groupOfTemplates;
		return ((IS_ADMIN || ((USER_ID.toString() === groupId) || isPublic)) && Boolean(templates.length));
	}, [groupOfTemplates]);
	if (!isShowGroup) {
		return <></>;
	}
	return (
		<div className={cl['template-sidebar-group']}>
			<div className={cl['template-sidebar-group__header']}>
				{ groupOfTemplates.title }
			</div>
			<div className={cl['template-sidebar-group__list']}>
				{
					groupOfTemplates.templates.map(template =>
						<TemplateSidebarItem
							template={template}
							selectedTemplate={selectedTemplate}
							setSelectedTemplate={setSelectedTemplate}
							key={template.id}
						/>
					)
				}
			</div>
		</div>
	);
};

export default TemplateSidebarGroup;
