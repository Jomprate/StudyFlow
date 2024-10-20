import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';

// Definir el tipo de roles permitidos
type UserRole = 'Student' | 'Teacher' | 'Admin' | null;

// Estado inicial y tipos
interface AuthState {
    isAuthenticated: boolean;
    role: UserRole;
    userName: string | null;
}

interface AuthContextProps {
    state: AuthState;
    login: (role: UserRole, userName: string) => void;
    logout: () => void;
}

// Estado inicial de la aplicación
const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    userName: null,
};

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Reducer para manejar las acciones de autenticación
const authReducer = (state: AuthState, action: { type: string; payload?: any }): AuthState => {
    console.log('Reducer received action:', action.type);

    switch (action.type) {
        case 'LOGIN':
            console.log('Handling LOGIN action with payload:', action.payload);
            return {
                ...state,
                isAuthenticated: true,
                role: action.payload.role,
                userName: action.payload.userName,
            };
        case 'LOGOUT':
            console.log('Handling LOGOUT action');
            return {
                ...state,
                isAuthenticated: false,
                role: null,
                userName: null,
            };
        default:
            console.log('Unknown action type:', action.type);
            return state;
    }
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Función login que actualiza el estado y guarda los datos en LocalStorage
    const login = (role: UserRole, userName: string) => {
        console.log('Dispatching login with role:', role, 'and userName:', userName);

        localStorage.setItem('authData', JSON.stringify({ role, userName }));

        dispatch({ type: 'LOGIN', payload: { role, userName } });
    };

    // Función logout que limpia el estado y LocalStorage
    const logout = () => {
        console.log('Dispatching logout');

        localStorage.removeItem('authData');

        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
            const { role, userName } = JSON.parse(storedAuthData);
            console.log('Restoring auth data from LocalStorage:', { role, userName });
            // Si hay datos guardados en LocalStorage, restaurar el estado de autenticación
            dispatch({ type: 'LOGIN', payload: { role, userName } });
        }
    }, []);

    // useEffect para monitorear cambios en el estado de autenticación
    useEffect(() => {
        console.log('Auth state updated:', state);
    }, [state]); // Se ejecuta cada vez que cambia el estado de autenticación

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};