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

const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    userName: null,
};

// Crear el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Reducer para manejar las acciones de autenticación
const authReducer = (state: AuthState, action: { type: string; payload?: any }): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                role: action.payload.role,
                userName: action.payload.userName,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                role: null,
                userName: null,
            };
        default:
            return state;
    }
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (role: UserRole, userName: string) => {
        dispatch({ type: 'LOGIN', payload: { role, userName } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};