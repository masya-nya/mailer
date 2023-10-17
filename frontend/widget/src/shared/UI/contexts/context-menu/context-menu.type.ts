import { ContextMenuItemTypeT } from '../context-menu-item/context-menu-item.type';

export type ContextMenuConfigurationT = {
	type?: ContextMenuItemTypeT
	title: string
	handler: () => void
}