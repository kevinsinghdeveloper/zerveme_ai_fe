import React, {createContext, useContext, useState, PropsWithChildren, useEffect} from 'react';
import {useAuthContext} from "./AuthContext";
import axios from "axios";

type OptionType = { value: string; label: string };

interface ReportTypeInfo {
    Id: string;
    Name: string;
}

interface JobFreqTypeInfo {
    Id: string;
    Name: string;
}

interface JobInfo {
    Id: string;
    JobFreqType: JobFreqTypeInfo | null;
    JobScheduleId: string;
    UpdatedUserId: string;
    CreatedUserId: string;
    Updated: string | null;
    Created: string;
    Deleted: string | null;
    LastRunDate: string | null;
    JobStatusType: number; // 0: Queued, 1: Running, 2: Completed, 3: Cancelled
}

interface ReportInfo {
    Id: string;
    Name: string;
    Description: string;
    ProjectId: string;
    ReportType: ReportTypeInfo;
    Job: JobInfo | null;
}

interface ProjectInfo {
    Id: string;
    Name: string;
    Description: string;
    Reports: ReportInfo[];
    OrganizationId: string;
}

interface CreateProjectRequest {
    Name: string;
    Description?: string;
    OrganizationId?: string;
}

interface UpdateProjectRequest {
    Id: string;
    Name: string;
    Description?: string;
    OrganizationId?: string;
}

interface CreateReportRequest {
    name: string;
    description: string;
    projectId: string;
    reportTypeId: string;
    jobFreqTypeId: string;
}

interface UpdateReportRequest {
    id: string;
    name: string;
    description: string;
    projectId: string;
    reportTypeId: string;
    jobFreqTypeId: string;
}

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
    selectedDatasetDomainOptions: any;
    setSelectedDatasetId: React.Dispatch<React.SetStateAction<string | null>>;
    getDatasetPreview: () => Promise<void>;
    getDatasetDomainOptions: () => Promise<void>;
    projects: ProjectInfo[];
    reports: ReportInfo[];
    getAllProjects: () => Promise<void>;
    getAllReportsForProject: (projectId: string) => Promise<ReportInfo[]>;
    createProject: (request: CreateProjectRequest) => Promise<ProjectInfo | null>;
    updateProject: (request: UpdateProjectRequest) => Promise<ProjectInfo | null>;
    createReport: (request: CreateReportRequest) => Promise<ReportInfo | null>;
    updateReport: (request: UpdateReportRequest) => Promise<ReportInfo | null>;
    focusedReport: { Id: string; Name: string } | null;
    setFocusedReport: React.Dispatch<React.SetStateAction<{ Id: string; Name: string } | null>>;
    jobFreqTypes: JobFreqTypeInfo[];
    getAllJobFreqTypes: () => Promise<void>;
    reportTypes: ReportTypeInfo[];
    getAllReportTypes: () => Promise<void>;
    softDeleteProject: (projectId: string) => Promise<boolean>;
    softDeleteReport: (reportId: string) => Promise<boolean>;
}

interface DomainOptionsResults {
    kpi_cols: string [] | null;
    attr_cols: string [] | null;
    period_start: string | null;
    period_end: string | null;
    num_rows: number | null;
}

const ExplorerContext = createContext<ExplorerContextProps | undefined>(undefined);

export const ExplorerContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<OptionType[]>([]);
    const [selectedKPIs, setSelectedKpis] = useState<OptionType[]>([]);
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');
    const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);
    const [selectedDatasetDomainOptions, setSelectedDatasetDomainOptions] = useState<DomainOptionsResults | null>(null);
    const [datasets, setDatasets] = useState<any[]>([]);
    const [fetchedData, setFetchedData] = useState<any>(null);
    const [focusedReport, setFocusedReport] = useState<{ Id: string; Name: string } | null>(null);
    const [projects, setProjects] = useState<ProjectInfo[]>([]);
    const [reports, setReports] = useState<ReportInfo[]>([]);
    const [jobFreqTypes, setJobFreqTypes] = useState<JobFreqTypeInfo[]>([]);
    const [reportTypes, setReportTypes] = useState<ReportTypeInfo[]>([]);

    const {host, token} = useAuthContext();

    // Initialize projects when context is created
    useEffect(() => {
        const initializeProjects = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${host}/api/project/getAllOrgProjects`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProjects(response.data);
                } catch (error) {
                    console.error('Failed to fetch projects:', error);
                }
            }
        };
        initializeProjects();
    }, [token, host]);

    const getAllProjects = async () => {
        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/project/getAllOrgProjects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    // Dataset operations
    const getAllDatasets = async () => {
        if (!token) {
            //console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/datasets/getAllDatasetNames`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //return response.data; // Return fetched data

            setDatasets(response.data);
        } catch (error) {
            console.error('Data fetch failed:', error);
            return;
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

    const getDatasetDomainOptions = async () => {
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
            const response = await axios.get(`${host}/api/datasets/getDatasetDomainOptions?id=${selectedDatasetId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const parsedData = response.data.domainData;

            setSelectedDatasetDomainOptions(prevOptions => ({
                ...prevOptions,
                kpi_cols: parsedData.kpi_cols,
                attr_cols: parsedData.attr_cols,
                period_start: parsedData.period_start,
                period_end: parsedData.period_end,
                num_rows: parsedData.num_rows
            }));


        } catch (error) {
            console.error('Data fetch failed:', error);
            return; // Return undefined or nothing if data fetch fails
        }
    };

    const getDataOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // const formData = {
        //     startDate,
        //     endDate,
        //     dimensions: selectedDimensions,
        //     kpis: selectedKPIs,
        //     visualizationType: selectedVisualization,
        // };

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

    const getAllReportsForProject = async (projectId: string): Promise<ReportInfo[]> => {
        const project = projects.find(p => p.Id === projectId);
        return project?.Reports || [];
    };

    const createProject = async (request: CreateProjectRequest): Promise<ProjectInfo | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/project/create`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newProject = response.data;
            setProjects(prev => [...prev, newProject]);
            return newProject;
        } catch (error) {
            console.error('Failed to create project:', error);
            return null;
        }
    };

    const updateProject = async (request: UpdateProjectRequest): Promise<ProjectInfo | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/project/update`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedProject = response.data;
            // Update the project while preserving its reports
            setProjects(prev => prev.map(p => p.Id === updatedProject.Id ? {
                ...updatedProject,
                Reports: p.Reports // Preserve the existing reports
            } : p));
            return updatedProject;
        } catch (error) {
            console.error('Failed to update project:', error);
            return null;
        }
    };

    const createReport = async (request: CreateReportRequest): Promise<ReportInfo | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/report/create`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newReport = response.data;
            setProjects(prev => prev.map(p => p.Id === request.projectId ? {
                ...p,
                Reports: [...p.Reports, newReport]
            } : p));
            return newReport;
        } catch (error) {
            console.error('Failed to create report:', error);
            return null;
        }
    };

    const updateReport = async (request: UpdateReportRequest): Promise<ReportInfo | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/report/update`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const updatedReport = response.data;
            setProjects(prev => prev.map(p => ({
                ...p,
                Reports: p.Reports.map(r => r.Id === updatedReport.Id ? updatedReport : r)
            })));
            return updatedReport;
        } catch (error) {
            console.error('Failed to update report:', error);
            return null;
        }
    };

    const getAllJobFreqTypes = async () => {
        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/Job/getAllJobFreqTypes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setJobFreqTypes(response.data);
        } catch (error) {
            console.error('Failed to fetch job frequency types:', error);
        }
    };

    const getAllReportTypes = async () => {
        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/report/getAllReportTypes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReportTypes(response.data);
        } catch (error) {
            console.error('Failed to fetch report types:', error);
        }
    };

    // Initialize job frequency types when context is created
    useEffect(() => {
        getAllJobFreqTypes();
    }, [token, host]);

    // Initialize report types when context is created
    useEffect(() => {
        getAllReportTypes();
    }, [token, host]);

    // Fetch datasets on component mount or when token changes
    /*
    useEffect(() => {
        const fetchDatasets = async () => {
            const data = await getAllDatasets();
            setDatasets(data); // Update datasets state with fetched data
        };

        fetchDatasets(); // Call the fetch function
    }, [token]); // Fetch datasets whenever token changes
    */

    const softDeleteProject = async (projectId: string): Promise<boolean> => {
        if (!token) {
            console.error('Token is not available');
            return false;
        }

        try {
            const response = await axios.post(`${host}/api/project/${projectId}/softDeleteProject`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getAllProjects(); // Refresh projects after deletion
            return response.data;
        } catch (error) {
            console.error('Failed to delete project:', error);
            return false;
        }
    };

    const softDeleteReport = async (reportId: string): Promise<boolean> => {
        if (!token) {
            console.error('Token is not available');
            return false;
        }

        try {
            const response = await axios.post(`${host}/api/report/${reportId}/softDeleteReport`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getAllProjects(); // Refresh projects after deletion
            return response.data;
        } catch (error: any) {
            // Re-throw the error to be handled by the component
            throw error;
        }
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
                getDataOnSubmit,
                getAllDatasets,
                datasets,
                fetchedData,
                selectedDatasetId,
                setSelectedDatasetId,
                getDatasetPreview,
                selectedDatasetDomainOptions,
                getDatasetDomainOptions,
                projects,
                reports,
                getAllProjects,
                getAllReportsForProject,
                createProject,
                updateProject,
                createReport,
                updateReport,
                focusedReport,
                setFocusedReport,
                jobFreqTypes,
                getAllJobFreqTypes,
                reportTypes,
                getAllReportTypes,
                softDeleteProject,
                softDeleteReport,
            }}
        >
            {children}
        </ExplorerContext.Provider>
    );
};

export const useExplorerContext = () => {
    const context = useContext(ExplorerContext);
    if (!context) {
        throw new Error('useExplorerContext must be used within an ExplorerContextProvider');
    }
    return context;
};