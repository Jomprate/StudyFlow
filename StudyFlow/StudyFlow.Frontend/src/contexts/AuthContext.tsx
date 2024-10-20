import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { logoutUser } from '../services/api'; // Importar la función logoutUser para hacer la llamada al API

// Definir el tipo de roles permitidos
type UserRole = 'Student' | 'Teacher' | 'Admin' | null;

// Estado inicial y tipos
interface AuthState {
    isAuthenticated: boolean;
    role: UserRole;
    userName: string | null;
    token: string | null; // Incluir el token en el estado
}

interface AuthContextProps {
    state: AuthState;
    login: (role: UserRole, userName: string, token: string) => void; // Añadir token a la función login
    logout: () => Promise<void>; // El logout ahora devuelve una Promise para manejar asincronía
}

// Estado inicial de la aplicación
const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    userName: null,
    token: null, // Token inicial es null
};

// Crear el contexto de autenticación
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
                token: action.payload.token, // Guardar el token en el estado
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                role: null,
                userName: null,
                token: null, // Limpiar el token en el logout
            };
        default:
            return state;
    }
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Función login que actualiza el estado, guarda el token y otros datos en LocalStorage
    const login = (role: UserRole, userName: string, token: string) => {
        console.log('Dispatching login with role:', role, 'and userName:', userName);

        // Guardar los datos de autenticación en LocalStorage
        localStorage.setItem('authData', JSON.stringify({ role, userName }));
        localStorage.setItem('authToken', token); // Guardar el token por separado

        // Despachar la acción LOGIN para actualizar el estado
        dispatch({ type: 'LOGIN', payload: { role, userName, token } });
    };

    // Función logout que realiza la llamada a la API, limpia el estado y LocalStorage
    const logout = async () => {
        try {
            console.log('Calling logout API...');
            // Llamar a la API para hacer logout
            await logoutUser();

            console.log('Logout successful, clearing auth data...');
            // Limpiar los datos locales
            localStorage.removeItem('authData');
            localStorage.removeItem('authToken'); // Limpiar también el token

            // Despachar la acción LOGOUT para actualizar el estado global
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Error during logout:', error);
            throw error; // Lanzar el error para manejarlo en componentes como Navbar
        }
    };

    // Restaurar los datos de autenticación desde LocalStorage al cargar la aplicación
    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        const storedToken = localStorage.getItem('authToken'); // Restaurar el token
        if (storedAuthData && storedToken) {
            const { role, userName } = JSON.parse(storedAuthData);
            console.log('Restoring auth data from LocalStorage:', { role, userName, token: storedToken });
            dispatch({ type: 'LOGIN', payload: { role, userName, token: storedToken } });
        }
    }, []);

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