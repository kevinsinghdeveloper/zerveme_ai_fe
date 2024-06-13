import React, {createContext, useContext, useState, PropsWithChildren, useEffect} from 'react';
import axios from 'axios';
import credentials from '../../configs/credentials.dev.json';


interface AuthContextProps {
    host: string | null;
    token: string | null;
    login: (username: string, password: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [host, setHost] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Fetch credentials.dev.json file (assuming it's served statically)
        const fetchCredentials = async () => {
            try {
                //const response = await axios.get(credentials); // Adjust the path as per your setup
                const {userName, password, host, emailAddress} = credentials.app_api_credentials;
                setHost(host)
                setUsername(userName);
                setPassword(password);
                setEmail(emailAddress);
            } catch (error) {
                console.error('Error fetching credentials:', error);
            }
        };

        fetchCredentials();
    }, []); // Fetch data only once on component mount

    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string, email: string) => {
        try {
            const response = await axios.post(`${host}/api/authentication/authorizeUser`, {
                userName: username,
                password: password,
                emailAddress: email
            });
            setToken(response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        // Automatically log in with credentials from the JSON file
        if (username && password && email) {
            login(username, password, email);
        }
    }, [username, password, email]);

    return (
        <AuthContext.Provider value={{host, token, login}}>
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
