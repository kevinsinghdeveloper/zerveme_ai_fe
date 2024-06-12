import React, {createContext, useContext, useState, PropsWithChildren, ReactNode} from 'react';

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
}

const ExplorerContext = createContext<ExplorerContextProps | undefined>(undefined);

export const ExplorerContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<OptionType[]>([]);
    const [selectedKPIs, setSelectedKpis] = useState<OptionType[]>([]);
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            startDate,
            endDate,
            dimensions: selectedDimensions,
            kpis: selectedKPIs,
            visualizationType: selectedVisualization,
        };
        // Make your API call here with formData
        console.log(formData);
    };

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