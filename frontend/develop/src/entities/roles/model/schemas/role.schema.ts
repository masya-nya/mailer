export interface RoleI<T = string> {
	readonly _id: string;

	readonly name: string;

	readonly accountId: string;
	
	readonly rights: string[];

	readonly users: T[];
}