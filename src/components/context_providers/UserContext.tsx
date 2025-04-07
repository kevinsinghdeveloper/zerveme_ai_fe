import React, {createContext, useContext, useState, PropsWithChildren, useCallback} from 'react';
import {useAuthContext} from './AuthContext';
import axios from 'axios';

// build User Interface

interface UserObj {
    Id: string;
    FirstName: string | null;
    LastName: string | null;
    Email: string | null;
    UserName: string | null;
    NotificationEmail: string | null;
    PrimaryPhone: string | null;
    SecondaryPhone: string | null;
    Address1: string | null;
    Address2: string | null;
    Address3: string | null;
    City: string | null;
    State: string | null;
    ZipCode: string | null;
    Country: string | null;
    OrganizationId: string | null;
}

interface UserContextProps {
    users: UserObj[];
    currentUser: UserObj | null;
    loading: boolean;
    error: string | null;
    getUsers: () => void;  // No need for passing an endpoint anymore
    getCurrentUser: () => void;
    updateUser: (userObj: UserObj) => void;

}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [users, setUsers] = useState<UserObj[]>([]);
    const [currentUser, setCurrentUser] = useState<UserObj | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {host, token} = useAuthContext();

    const getAllUsersEndpoint = '/api/users/getAllUsers';  // Define endpoint here
    const getCurrentUserEndpoint = '/api/users/getCurrentUser';  // Define endpoint here
    const updateCurrentUserEndpoint = '/api/users/update';

    // Generic fetch function
    const getUsers = async () => {
        if (!token) {
            setError('Token is not available');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${host}${getAllUsersEndpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            // Ensure we are dealing with an array and map it to UserObj
            const users: UserObj[] = Array.isArray(data)
                ? data.map((item: any) => ({
                    Id: item.Id,
                    FirstName: item.FirstName ?? null,
                    LastName: item.LastName ?? null,
                    Email: item.Email ?? null,
                    UserName: item.UserName ?? null,
                    NotificationEmail: item.NotificationEmail ?? null,
                    PrimaryPhone: item.PrimaryPhone ?? null,
                    SecondaryPhone: item.SecondaryPhone ?? null,
                    Address1: item.Address1 ?? null,
                    Address2: item.Address2 ?? null,
                    Address3: item.Address3 ?? null,
                    City: item.City ?? null,
                    State: item.State ?? null,
                    ZipCode: item.ZipCode ?? null,
                    Country: item.Country ?? null,
                    OrganizationId: item.OrganizationId ?? null,
                }))
                : [];  // If data is not an array, set it as an empty list

            setUsers(users); // Set users list

        } catch (err) {
            // In case of failure, set an empty list and show a warning
            setUsers([]);
            setError('Failed to fetch users, please try again later.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };
    const getCurrentUser = useCallback(async () => {
        if (!token) {
            setError('Token is not available');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${host}${getCurrentUserEndpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            console.log(data)
            // Check if data exists and ensure the response is valid
            if (data) {
                const currentUser: UserObj = {
                    Id: data.Id,
                    FirstName: data.FirstName ?? null,
                    LastName: data.LastName ?? null,
                    Email: data.Email ?? null,
                    UserName: data.UserName ?? null,
                    NotificationEmail: data.NotificationEmail ?? null,
                    PrimaryPhone: data.PrimaryPhone ?? null,
                    SecondaryPhone: data.SecondaryPhone ?? null,
                    Address1: data.Address1 ?? null,
                    Address2: data.Address2 ?? null,
                    Address3: data.Address3 ?? null,
                    City: data.City ?? null,
                    State: data.State ?? null,
                    ZipCode: data.ZipCode ?? null,
                    Country: data.Country ?? null,
                    OrganizationId: data.OrganizationId ?? null,
                };

                setCurrentUser(currentUser);
            } else {
                setError('Data fetch failed for current user');
            }
        } catch (err) {
            setError('Failed to fetch current user, please try again later.');
            console.error('Error fetching current user:', err);
        } finally {
            setLoading(false);
        }
    }, [token, host]);

    const updateUser = async (userObj: UserObj) => {
        if (!token) {
            setError('Token is not available');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Map the UserObj to match the backend expected format
            const userUpdateRequest = {
                Id: userObj.Id,
                userName: userObj.UserName,
                firstName: userObj.FirstName,
                lastName: userObj.LastName,
                emailAddress: userObj.Email,
                Address1: userObj.Address1,
                Address2: userObj.Address2,
                Address3: userObj.Address3,
                City: userObj.City,
                State: userObj.State,
                Country: userObj.Country,
                ZipCode: userObj.ZipCode,
                PrimaryPhone: userObj.PrimaryPhone,
                SecondaryPhone: userObj.SecondaryPhone,
                NotificationEmail: userObj.NotificationEmail,
            };

            const response = await axios.post(`${host}${updateCurrentUserEndpoint}`, userUpdateRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedUser = response.data;
            console.log("Updated User:", updatedUser);

            // Update the currentUser state after successfully updating the user
            setCurrentUser(updatedUser);
        } catch (err) {
            setError('Failed to update user, please try again later.');
            console.error('Error updating user:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <UserContext.Provider value={{users, loading, error, getUsers, getCurrentUser, currentUser, updateUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};