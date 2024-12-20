import { createContext, useContext, useReducer, useEffect } from 'react';
import { userApi } from '../services/api';

interface UserState {
    imageBase64: string | null;
    email: string | null;
    fullName: string | null;
}

interface UserContextProps {
    state: UserState;
    updateUserData: (userId: string) => void;
    clearUserData: () => void;
}

const initialState: UserState = {
    imageBase64: null,
    email: null,
    fullName: null,
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: UserState, action: { type: string; payload?: Partial<UserState> }): UserState => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return { ...state, ...action.payload };
        case 'CLEAR_USER_DATA':
            return initialState;
        default:
            return state;
    }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const updateUserData = async (userId: string) => {
        try {
            const response = await userApi.getuserbyid(userId);
            const { email, firstName, lastName, profilePicture } = response.data;
            dispatch({
                type: 'SET_USER_DATA',
                payload: {
                    email,
                    fullName: `${firstName} ${lastName}`,
                    imageBase64: profilePicture ? `data:image/png;base64,${profilePicture}` : null,
                },
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const clearUserData = () => {
        dispatch({ type: 'CLEAR_USER_DATA' });
    };

    useEffect(() => {
        // Example of automatically fetching data if needed, e.g., on login.
    }, []);

    return (
        <UserContext.Provider value={{ state, updateUserData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};