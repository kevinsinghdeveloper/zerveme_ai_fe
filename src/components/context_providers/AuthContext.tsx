import React, {
    createContext,
    useContext,
    useState,
    PropsWithChildren,
    useEffect,
} from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import credentials from '../../configs/credentials.dev.json';

interface AuthContextProps {
    host: string | null;
    token: string | null;
    userNameOrEmail: string | null;
    isLoading: boolean;
    error: string | null;
    login: (
        userNameOrEmail: string,
        password: string,
        onSuccess?: () => void,
        onError?: () => void
    ) => Promise<void>;
    logout: (onLogout?: () => void) => void;
    clearError: () => void;
}

interface DecodedToken {
    exp: number;

    [key: string]: any;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (err) {
        console.error('Failed to decode token:', err);
        return true;
    }
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [host, setHost] = useState<string | null>(null);
    const [userNameOrEmail, setUserNameOrEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load credentials
    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const {host} = credentials.app_api_credentials;
                setHost(host);
            } catch (error) {
                console.error('Error fetching credentials:', error);
                setError('Failed to load configuration');
                setIsLoading(false);
            }
        };

        fetchCredentials();
    }, []);

    // Check stored token and validate expiration
    useEffect(() => {
        const checkStoredAuth = () => {
            const storedToken = localStorage.getItem('authToken');
            const storedUserName = localStorage.getItem('userName');

            if (storedToken && !isTokenExpired(storedToken)) {
                setToken(storedToken);
                if (storedUserName) {
                    setUserNameOrEmail(storedUserName);
                }
            } else {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userName');
                setToken(null);
                setUserNameOrEmail(null);
            }

            setIsLoading(false);
        };

        checkStoredAuth();
    }, []);

    const clearError = () => {
        setError(null);
    };

    const login = async (
        userNameOrEmail: string,
        password: string,
        onSuccess?: () => void,
        onError?: () => void
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${host}/api/authentication/authorizeUser`, {
                UserNameOrEmail: userNameOrEmail,
                Password: password,
            });

            setToken(response.data.token);
            setUserNameOrEmail(response.data.userName);

            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userName', response.data.userName);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            console.error('Login failed:', error);

            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid username or password');
                } else if (error.response.status === 404) {
                    setError('User not found');
                } else {
                    setError(`Login failed: ${error.response.data.message || 'Server error'}`);
                }
            } else if (error.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError('Login request failed. Please try again.');
            }

            if (onError) {
                onError();
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (onLogout?: () => void) => {
        setToken(null);
        setUserNameOrEmail(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                host,
                token,
                userNameOrEmail,
                isLoading,
                error,
                login,
                logout,
                clearError,
            }}
        >
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