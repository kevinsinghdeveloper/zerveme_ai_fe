import React, {createContext, useContext, useState, PropsWithChildren, ReactNode, useEffect} from 'react';
import {useAuthContext} from "./AuthContext";
import axios from "axios";

type OptionType = { value: string; label: string };

interface ExplorerContextProps {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    selectedDimensions: OptionType[];
    setSelectedDimensions: React.Dispatch<React.SetStateAction<OptionType[]>>;
    selectedKPIs: OptionType[];
    setSelectedKpis: React.Dispatch<React.SetStateAction<OptionType[]>>;
    selectedVisualization: string;
    setSelectedVisualization: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    getAllDatasets: () => Promise<void>;
    datasets: any[];
}

const ExplorerContext = createContext<ExplorerContextProps | undefined>(undefined);

export const ExplorerContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<OptionType[]>([]);
    const [selectedKPIs, setSelectedKpis] = useState<OptionType[]>([]);
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');

    const [datasets, setDatasets] = useState<any[]>([]); // Initialize datasets state


    const {host, token} = useAuthContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            startDate,
            endDate,
            dimensions: selectedDimensions,
            kpis: selectedKPIs,
            visualizationType: selectedVisualization,
        };

        if (!token) {
            console.error('No authentication token available');
            return [];
        }

        try {
            const response = await axios.post('https://example.com/api/submit', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    // Dataset operations
    // Fetch all datasets function
    const getAllDatasets = async () => {
        if (!token) {
            //console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.get(`${host}/api/datasets/getall`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data; // Return fetched data
        } catch (error) {
            console.error('Data fetch failed:', error);
            return [];
        }
    };

    // Fetch datasets on component mount or when token changes
    useEffect(() => {
        const fetchDatasets = async () => {
            const data = await getAllDatasets();
            setDatasets(data); // Update datasets state with fetched data
        };

        fetchDatasets(); // Call the fetch function
    }, [token]); // Fetch datasets whenever token changes

    return (
        <ExplorerContext.Provider
            value={{
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                selectedDimensions,
                setSelectedDimensions,
                selectedKPIs,
                setSelectedKpis,
                selectedVisualization,
                setSelectedVisualization,
                handleSubmit,
                getAllDatasets,
                datasets
            }}
        >
            {children}
        </ExplorerContext.Provider>
    );
};

export const useExplorerContext = () => {
    const context = useContext(ExplorerContext);
    if (!context) {
        throw new Error('useSystemContext must be used within a SystemContextProvider');
    }
    return context;
};