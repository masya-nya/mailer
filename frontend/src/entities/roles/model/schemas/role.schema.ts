import { RolesRightsT } from '../..';
import { RolesSystemNames } from '../../lib/config/system-roles';

export interface RoleI<T = string> {
	readonly _id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: RolesRightsT[];

	readonly systemName?: RolesSystemNames | null;

	readonly users: T[];
}