import React, {createContext, useContext, useState, PropsWithChildren, useEffect} from 'react';
import {useAuthContext} from "./AuthContext";
import axios from "axios";
import {ReportTemplate, ReportData} from '../../types/reportTemplates';

type OptionType = { value: string; label: string };

interface ReportConfigField {
    FieldName: string;
    PossibleOptions: string[];
    FieldType: 0 | 1; // 0 for dropdown, 1 for text input
    is_multi?: boolean; // Optional property to indicate if multiple values are allowed
}

interface ReportConfig {
    Fields: ReportConfigField[];
}

interface ReportTypeInfo {
    Id: string;
    Name: string;
    ReportConfig: ReportConfig;
}

interface JobFreqTypeInfo {
    Id: string;
    Name: string;
}

interface JobInfo {
    Id: string;
    JobFreqType: {
        Id: string;
        Name: string;
    };
    JobScheduleId: string | null;
    UpdatedUserId: string;
    CreatedUserId: string;
    Updated: string;
    Created: string;
    Deleted: string | null;
    LastRunDate: string | null;
    ReportEntity: any | null;
    JobStatusType: number;
}

interface ReportInfo {
    Id: string;
    Name: string;
    Description: string;
    ProjectId: string;
    Model: {
        Id: string;
        Name: string;
    };
    ReportType: {
        Id: string;
        Name: string;
        Description: string;
        DatasetId: string | null;
        DatasetEntity: any | null;
        ReportConfigurationEntity: any | null;
        Updated: string | null;
        Created: string;
        Deleted: string | null;
    };
    Job: JobInfo | null;
    ReportConfigurationId: string;
    DatasetConfig: string | null;
    DatasetData: {
        Id?: string;
        Name?: string;
        DomainData?: any;
        Updated?: string | null;
        Created?: string | null;
        Deleted?: string | null;
        DWHId?: string | null;
        DataRefreshedDate?: string | null;
    } | null;
}

interface ProjectInfo {
    Id: string;
    Name: string;
    Description: string;
    Reports: ReportInfo[];
    OrganizationId?: string;
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
    modelId: string;
    jobFreqTypeId: string;
    datasetConfig: string;
}

interface UpdateReportRequest {
    id: string;
    name: string;
    description: string;
    projectId: string;
    reportTypeId: string;
    modelId: string;
    jobFreqTypeId: string;
}

interface Model {
    Id: string;
    Name: string;
    Description: string;
    ModelConfig: string;
    ModelType: string;
    ModelTypeId: string;
}

interface ModelType {
    Id: string;
    Name: string;
    Description: string;
}

interface CreateModelRequest {
    name: string;
    description: string;
    modelConfig: string;
    modelTypeId: string;
}

interface UpdateModelRequest {
    id: string;
    name: string;
    description: string;
    modelConfig: string;
    modelTypeId: string;
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
    selectedDatasetDomainOptions: DatasetDomainResponse | null;
    setSelectedDatasetId: React.Dispatch<React.SetStateAction<string | null>>;
    getDatasetPreview: () => Promise<void>;
    getDatasetDomainOptions: (datasetId: string) => Promise<void>;
    projects: ProjectInfo[];
    reports: ReportInfo[];
    getAllProjects: () => Promise<void>;
    getAllReportsForProject: (projectId: string) => Promise<ReportInfo[]>;
    createProject: (request: CreateProjectRequest) => Promise<ProjectInfo | null>;
    updateProject: (request: UpdateProjectRequest) => Promise<ProjectInfo | null>;
    createReport: (request: CreateReportRequest) => Promise<ReportInfo | null>;
    updateReport: (request: UpdateReportRequest) => Promise<ReportInfo | null>;
    focusedReport: { Id: string; Name: string; DatasetId: string | null } | null;
    setFocusedReport: React.Dispatch<React.SetStateAction<{
        Id: string;
        Name: string;
        DatasetId: string | null
    } | null>>;
    jobFreqTypes: JobFreqTypeInfo[];
    getAllJobFreqTypes: () => Promise<void>;
    reportTypes: ReportTypeInfo[];
    getAllReportTypes: () => Promise<void>;
    softDeleteProject: (projectId: string) => Promise<boolean>;
    softDeleteReport: (reportId: string) => Promise<boolean>;
    models: Model[];
    modelTypes: ModelType[];
    getAllModels: () => Promise<void>;
    getAllModelTypes: () => Promise<void>;
    createModel: (request: CreateModelRequest) => Promise<Model | null>;
    updateModel: (request: UpdateModelRequest) => Promise<Model | null>;
    softDeleteModel: (modelId: string) => Promise<boolean>;
    dashboardTemplate: ReportTemplate | null;
    setDashboardTemplate: React.Dispatch<React.SetStateAction<ReportTemplate | null>>;
    dashboardData: ReportData | null;
    setDashboardData: React.Dispatch<React.SetStateAction<ReportData | null>>;
    dashboardLoading: boolean;
    dashboardError: string | null;
    fetchDashboardForReport: (reportId: string) => Promise<void>;
}

interface DomainOptionsResults {
    kpi_cols: string [] | null;
    attr_cols: string [] | null;
    period_start: string | null;
    period_end: string | null;
    num_rows: number | null;
}

interface DatasetDomainColumn {
    ColumnName: string;
    ColumnType: number;  // 0 for attribute, 1 for KPI, 2 for date
    AggregationType: number;
}

interface DatasetDomainData {
    KpiCols: DatasetDomainColumn[];
    AttrCols: DatasetDomainColumn[];
    CustomSql: string | null;
    TableName: string;
}

interface DatasetDomainResponse {
    Id: string;
    Name: string;
    DomainData: DatasetDomainData;
    Updated: string | null;
    Created: string;
    Deleted: string | null;
    DataRefreshedDate: string | null;
    DWHId: string | null;
}

const ExplorerContext = createContext<ExplorerContextProps | undefined>(undefined);

export const ExplorerContextProvider = ({children}: PropsWithChildren<{}>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedDimensions, setSelectedDimensions] = useState<OptionType[]>([]);
    const [selectedKPIs, setSelectedKpis] = useState<OptionType[]>([]);
    const [selectedVisualization, setSelectedVisualization] = useState<string>('');
    const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);
    const [selectedDatasetDomainOptions, setSelectedDatasetDomainOptions] = useState<DatasetDomainResponse | null>(null);
    const [datasets, setDatasets] = useState<any[]>([]);
    const [fetchedData, setFetchedData] = useState<any>(null);
    const [focusedReport, setFocusedReport] = useState<{
        Id: string;
        Name: string;
        DatasetId: string | null;
    } | null>(null);
    const [projects, setProjects] = useState<ProjectInfo[]>([]);
    const [reports, setReports] = useState<ReportInfo[]>([]);
    const [jobFreqTypes, setJobFreqTypes] = useState<JobFreqTypeInfo[]>([]);
    const [reportTypes, setReportTypes] = useState<ReportTypeInfo[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [modelTypes, setModelTypes] = useState<ModelType[]>([]);
    const [dashboardTemplate, setDashboardTemplate] = useState<ReportTemplate | null>(null);
    const [dashboardData, setDashboardData] = useState<ReportData | null>(null);
    const [dashboardLoading, setDashboardLoading] = useState(false);
    const [dashboardError, setDashboardError] = useState<string | null>(null);

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

    const getDatasetDomainOptions = async (datasetId: string) => {
        if (!token || !datasetId) {
            console.error('Token or dataset ID is missing');
            return;
        }

        try {
            const response = await axios.get<DatasetDomainResponse>(`${host}/api/datasets/getDatasetDomainOptions?id=${datasetId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSelectedDatasetDomainOptions(response.data);
        } catch (error) {
            console.error('Failed to fetch dataset domain options:', error);
            setSelectedDatasetDomainOptions(null);
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
            const response = await axios.get(`${host}/api/reportdataset/getAllReportTypes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Ensure every report type has a ReportConfig property (null if missing)
            const normalizedData = Array.isArray(response.data)
                ? response.data.map((rt: any) => ({
                    ...rt,
                    ReportConfig: rt.ReportConfig !== undefined ? rt.ReportConfig : null
                }))
                : [];
            setReportTypes(normalizedData);
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

    useEffect(() => {
        getAllModels();
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

    const getAllModels = async () => {
        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/models/getAllModels`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setModels(response.data);
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const getAllModelTypes = async () => {
        if (!token) {
            console.error('Token is not available');
            return;
        }

        try {
            const response = await axios.get(`${host}/api/models/getAllModelTypes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setModelTypes(response.data);
        } catch (error) {
            console.error('Error fetching model types:', error);
        }
    };

    const createModel = async (request: CreateModelRequest): Promise<Model | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/models/create`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getAllModels(); // Refresh the models list
            return response.data;
        } catch (error) {
            console.error('Error creating model:', error);
            return null;
        }
    };

    const updateModel = async (request: UpdateModelRequest): Promise<Model | null> => {
        if (!token) {
            console.error('Token is not available');
            return null;
        }

        try {
            const response = await axios.post(`${host}/api/models/update`, request, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getAllModels(); // Refresh the models list
            return response.data;
        } catch (error) {
            console.error('Error updating model:', error);
            return null;
        }
    };

    const softDeleteModel = async (modelId: string): Promise<boolean> => {
        if (!token) {
            console.error('Token is not available');
            return false;
        }

        try {
            const response = await axios.post(`${host}/api/models/${modelId}/softDeleteModel`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getAllModels(); // Refresh the models list
            return response.data;
        } catch (error) {
            console.error('Error deleting model:', error);
            return false;
        }
    };

    // Fetch dashboard template and data for a focused report
    const fetchDashboardForReport = async (reportId: string) => {
        setDashboardLoading(true);
        setDashboardError(null);
        setDashboardTemplate(null);
        setDashboardData(null);
        try {
            // Use POST with JSON body
            const response = await axios.post(
                `${host}/api/datasets/getvizdata`,
                {reportid: reportId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data && response.data.vizResponseTemplate && response.data.vizResponseData) {
                setDashboardTemplate(JSON.parse(response.data.vizResponseTemplate));
                setDashboardData(JSON.parse(response.data.vizResponseData));
            } else {
                throw new Error('Failed to fetch dashboard data');
            }
        } catch (err: any) {
            setDashboardError(err.message || 'Unknown error');
        } finally {
            setDashboardLoading(false);
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
                models,
                modelTypes,
                getAllModels,
                getAllModelTypes,
                createModel,
                updateModel,
                softDeleteModel,
                dashboardTemplate,
                setDashboardTemplate,
                dashboardData,
                setDashboardData,
                dashboardLoading,
                dashboardError,
                fetchDashboardForReport,
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