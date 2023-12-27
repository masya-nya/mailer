import { FC, ReactNode, createContext } from 'react';

interface RoleContextI {
	
}

type RolesProviderProps = {
	children: ReactNode
}

export const roleContextValue = {  };

export const RolesContext = createContext<RoleContextI>(roleContextValue);

export const RolesProvider: FC<RolesProviderProps> = ({ children }) => {
	const [theme, setRoles] = useState(defaultRoles);

	const defaultProps = useMemo(() => (
		{
			theme: theme,
			setRoles: setRoles,
		}
	), [theme]);
	
	return (
		<RolesContext.Provider value={defaultProps}>
			{ children }
		</RolesContext.Provider>
	);
};
