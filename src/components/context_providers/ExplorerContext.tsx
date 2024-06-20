import React, {createContext, useContext, useState, PropsWithChildren, ReactNode, useEffect} from 'react';
import {useAuthContext} from "./AuthContext";
import axios from "axios";
import {UUID} from "node:crypto";

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
    getDataOnSubmit: (e: React.FormEvent) => void;
    getAllDatasets: () => Promise<void>;
    datasets: any[];
    fetchedData: any;
    selectedDatasetId: string | null;
    setSelectedDatasetId: React.Dispatch<React.SetStateAction<string | null>>;
    getDatasetPreview: () => Promise<void>;
}

const ExplorerContext = createContext<ExplorerContextProps | undefined>(undefined);

export const ExplorerContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<OptionType[]>([]);
    const [selectedKPIs, setSelectedKpis] = useState<OptionType[]>([]);
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');

    const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);
    const [datasets, setDatasets] = useState<any[]>([]); // Initialize datasets state


    const {host, token} = useAuthContext();

    // Dataset operations
    const [fetchedData, setFetchedData] = useState<any>(null);

    // Fetch all datasets function
    const getAllDatasets = async () => {
        if (!token) {
            //console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.get(`${host}/api/datasets/getAllDatasetNames`, {
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

    const getDatasetPreview = async () => {
        if (!token) {
            // Handle case where token is not available
            console.error('Token is not available');
            return; // Return undefined or nothing if token is not available
        }

        if (!selectedDatasetId) {
            console.error('No dataset selected');
            return; // Return undefined or nothing if no dataset is selected
        }

        try {
            const response = await axios.get(`${host}/api/datasets/getdata?id=${selectedDatasetId}&rowLimit=50`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const parsedData = response.data.data;
            setFetchedData(parsedData);

        } catch (error) {
            console.error('Data fetch failed:', error);
            return; // Return undefined or nothing if data fetch fails
        }
    };


    // Querying the dataset -> getData
    /*
    const getData = async (datasetId: string) => {
        try {
            const response = await axios.get(`${host}/api/datasets/getdata?id=${datasetId}&rowLimit=50`);
            const parsedData = JSON.parse(response.data.token);
            setFetchedData(parsedData);
        } catch (error) {
            console.error('Data fetch failed:', error);
        }
    };

     */

    const getDataOnSubmit = async (e: React.FormEvent) => {
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

        if (!selectedDatasetId) {
            console.error('No dataset selected');
            return [];
        }

        try {
            const response = await axios.get(`${host}/api/datasets/getdata?id=${selectedDatasetId}&rowLimit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const parsedData = response.data.data;
            setFetchedData(parsedData);

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Submission failed:', error);
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
                getDataOnSubmit,
                getAllDatasets,
                datasets,
                fetchedData,
                selectedDatasetId,
                setSelectedDatasetId,
                getDatasetPreview
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