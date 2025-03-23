import React, {createContext, useContext, useState, PropsWithChildren, useEffect} from 'react';
import axios from 'axios';
import credentials from '../../configs/credentials.dev.json';

interface AuthContextProps {
    host: string | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string, email: string, onSuccess?: () => void, onError?: () => void) => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [host, setHost] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch credentials.dev.json file
        const fetchCredentials = async () => {
            try {
                const {host} = credentials.app_api_credentials;
                setHost(host);
            } catch (error) {
                console.error('Error fetching credentials:', error);
                setError('Failed to load configuration');
            }
        };

        fetchCredentials();
    }, []);

    const clearError = () => {
        setError(null);
    };

    const login = async (
        username: string,
        password: string,
        email: string,
        onSuccess?: () => void,
        onError?: () => void
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${host}/api/authentication/authorizeUser`, {
                userName: username,
                password: password,
                emailAddress: email
            });

            setToken(response.data.token);

            // Store token in localStorage for persistence
            localStorage.setItem('authToken', response.data.token);

            // Call the success callback if provided
            if (onSuccess) {
                onSuccess();
            }

        } catch (error: any) {
            console.error('Login failed:', error);

            // Set appropriate error message
            if (error.response) {
                // Server responded with an error
                if (error.response.status === 401) {
                    setError('Invalid username or password');
                } else if (error.response.status === 404) {
                    setError('User not found');
                } else {
                    setError(`Login failed: ${error.response.data.message || 'Server error'}`);
                }
            } else if (error.request) {
                // No response received
                setError('No response from server. Please check your connection.');
            } else {
                // Request setup error
                setError('Login request failed. Please try again.');
            }

            // Call the error callback if provided
            if (onError) {
                onError();
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Automatically log in with credentials from the JSON file
        if (username && password && email) {
            login(username, password, email);
        }
    }, [username, password, email]);

    return (
        <AuthContext.Provider value={{host, token, isLoading, error, login, clearError}}>
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