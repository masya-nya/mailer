import React from 'react';
import cl from './TemplateSidebarItem.module.scss';
import cn from 'classnames';
import { TemplateT } from '../../../../../entities/template';
import { DeleteSvg } from './../../../../../shared/svg/delete-svg/DeleteSvg';
import { COLORS, IS_ADMIN, USER_ID } from '../../../../../shared/lib';

type TemplateSidebarItemProps = {
	selectedTemplate: TemplateT | null
	setSelectedTemplate: (newTemplate: TemplateT) => void
	template: TemplateT
}

const TemplateSidebarItem = ({ template, selectedTemplate, setSelectedTemplate }:TemplateSidebarItemProps):React.JSX.Element => {
	return (
		<div
			onClick={() => setSelectedTemplate(template)}
			className={
				cn(
					cl['template-sidebar-item'],
					{
						[cl['template-sidebar-item--active']]: template.id === selectedTemplate?.id
					}
				)
			}
		>
			<div className={cl['template-sidebar-item__body']}>
				<div className={cl['template-sidebar-item__name']}>
					{ template.name }
				</div>
				<div className={cl['template-sidebar-item__author']}>
					{ template.author }
				</div>
				{
					(IS_ADMIN || (USER_ID === template.authorId)) &&
					<div className={cl['template-sidebar-item__delete']}>
						<DeleteSvg className={cl['template-sidebar-item__delete-icon']} width='25' height='25' color={COLORS.white_color} />
					</div>
				}
			</div>
		</div>
	);
};

export default TemplateSidebarItem;
