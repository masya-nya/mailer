import React, { ChangeEvent, useMemo } from 'react';
import cl from './TemplateSidebar.module.scss';
import { GroupedTemplatesT, TemplateT } from '../../../../../entities/template';
import TemplateSidebarGroup from '../template-sidebar-group/TemplateSidebarGroup';
import { Input } from '../../../../../shared/UI';

type TemplateSidebarProps = {
	selectedTemplate: TemplateT | null
	setSelectedTemplate: (newTemplate: TemplateT) => void
	groupedTemplates: GroupedTemplatesT
	searchingTemplateHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const TemplateSidebar = ({ selectedTemplate, setSelectedTemplate, groupedTemplates, searchingTemplateHandler }:TemplateSidebarProps):React.JSX.Element => {
	const sortedGroupsKeys = useMemo(() => {
		return Object.keys(groupedTemplates).sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
	}, [groupedTemplates]);
	return (
		<div className={cl['template-sidebar']}>
			<div className={cl['template-sidebar__search']}>
				<Input style={{ width: '100%' }} onChangeHandler={(event) => searchingTemplateHandler(event)} type='text' />
			</div>
			<div className={cl['template-sidebar__list']}>
				{
					sortedGroupsKeys.map(groupId =>
						<TemplateSidebarGroup
							groupOfTemplates={groupedTemplates[groupId]}
							selectedTemplate={selectedTemplate}
							setSelectedTemplate={setSelectedTemplate}
							key={groupId}
						/>
					)
				}
			</div>
		</div>
	);
};

export default TemplateSidebar;
