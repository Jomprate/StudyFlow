import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { logoutUser, getuserbyid } from '../services/api'; // Importar getuserbyid

// Definir el tipo de roles permitidos
type UserRole = 'Student' | 'Teacher' | 'Admin' | null;

// Estado inicial y tipos
interface AuthState {
    isAuthenticated: boolean;
    role: UserRole;
    userName: string | null;
    token: string | null;
    fullName: string | null; // Nuevo estado para el nombre completo del usuario
}

interface AuthContextProps {
    state: AuthState;
    login: (role: UserRole, userName: string, token: string) => void;
    logout: () => Promise<void>;
    fullName: string | null; // Exponer fullName en el contexto
}

// Estado inicial de la aplicación
const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    userName: null,
    token: null, // Token inicial es null
    fullName: null, // Inicializamos fullName como null
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
                token: null, // Limpiar el token en el logout
                fullName: null, // Limpiar fullName en el logout
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

        // Llamar a getuserbyid para obtener el nombre completo
        fetchUserFullName(userName);
    };

    // Función para obtener el nombre completo del usuario y almacenarlo en el estado global
    const fetchUserFullName = async (userId: string) => {
        try {
            const user = await getuserbyid(userId);
            const fullName = `${user.data.firstName} ${user.data.lastName}`;
            console.log('Fetched fullName:', fullName);

            // Guardar fullName en el estado
            dispatch({ type: 'SET_FULL_NAME', payload: { fullName } });
        } catch (error) {
            console.error('Error fetching user fullName:', error);
        }
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

            // Llamar a getuserbyid para restaurar el nombre completo
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