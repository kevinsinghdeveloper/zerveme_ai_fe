import React, {createContext, useContext, useState, PropsWithChildren} from 'react';
import axios from 'axios';

interface AuthContextProps {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('https://example.com/api/auth/login', {username, password});
            setToken(response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};
