import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { authApi, userApi } from '../services/api';

// Definir el tipo de roles permitidos
type UserRole = 'Student' | 'Teacher' | 'Admin' | null;

// Estado inicial y tipos
interface AuthState {
    isAuthenticated: boolean;
    role: UserRole;
    userName: string | null;
    token: string | null;
    fullName: string | null;
}

interface AuthContextProps {
    state: AuthState;
    login: (role: UserRole, userName: string, token: string) => void;
    logout: () => Promise<void>;
    fullName: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    userName: null,
    token: null,
    fullName: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: { type: string; payload?: any }): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                role: action.payload.role,
                userName: action.payload.userName,
                token: action.payload.token,
            };
        case 'SET_FULL_NAME':
            return {
                ...state,
                fullName: action.payload.fullName,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                role: null,
                userName: null,
                token: null,
                fullName: null,
            };
        default:
            return state;
    }
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (role: UserRole, userName: string, token: string) => {
        console.log('Dispatching login with role:', role, 'and userName:', userName);

        localStorage.setItem('authData', JSON.stringify({ role, userName }));
        localStorage.setItem('authToken', token);

        dispatch({ type: 'LOGIN', payload: { role, userName, token } });

        fetchUserFullName(userName);
    };

    const fetchUserFullName = async (userId: string) => {
        try {
            const user = await userApi.getuserbyid(userId);
            const fullName = `${user.data.firstName} ${user.data.lastName}`;
            console.log('Fetched fullName:', fullName);

            dispatch({ type: 'SET_FULL_NAME', payload: { fullName } });
        } catch (error) {
            console.error('Error fetching user fullName:', error);
        }
    };

    const logout = async () => {
        try {
            console.log('Calling logout API...');
            await authApi.logoutUser();

            console.log('Logout successful, clearing auth data...');
            localStorage.removeItem('authData');
            localStorage.removeItem('authToken');

            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        const storedToken = localStorage.getItem('authToken');
        if (storedAuthData && storedToken) {
            const { role, userName } = JSON.parse(storedAuthData);
            console.log('Restoring auth data from LocalStorage:', { role, userName, token: storedToken });
            dispatch({ type: 'LOGIN', payload: { role, userName, token: storedToken } });

            fetchUserFullName(userName);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, login, logout, fullName: state.fullName }}>
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