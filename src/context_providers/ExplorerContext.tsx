import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context_providers/AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

interface Project {
    Id: string;
    Name: string;
    Description: string;
    Reports: Report[];
}

interface Report {
    Id: string;
    Name: string;
    Description: string;
    ProjectId: string;
    ReportTypeId: string;
    JobFreqTypeId: string;
    ModelId: string;
    DatasetConfig: string;
}

interface ReportType {
    Id: string;
    Name: string;
    Description: string;
}

interface JobFreqType {
    Id: string;
    Name: string;
}

interface Model {
    Id: string;
    Name: string;
    Description: string;
    ModelType: string;
}

interface FocusedReport {
    Id: string;
    Name: string;
}

interface ExplorerContextType {
    projects: Project[];
    reportTypes: ReportType[];
    jobFreqTypes: JobFreqType[];
    models: Model[];
    focusedReport: FocusedReport | null;
    getAllProjects: () => Promise<void>;
    getAllReportTypes: () => Promise<void>;
    getAllJobFreqTypes: () => Promise<void>;
    getAllModels: () => Promise<void>;
    setFocusedReport: (report: FocusedReport | null) => void;
    createProject: (project: { Name: string; Description: string }) => Promise<void>;
    updateProject: (project: { Id: string; Name: string; Description: string }) => Promise<void>;
    softDeleteProject: (projectId: string) => Promise<boolean>;
    createReport: (report: {
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        modelId: string;
        datasetConfig: string;
    }) => Promise<void>;
    updateReport: (report: {
        id: string;
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        modelId: string;
        datasetConfig: string;
    }) => Promise<void>;
    softDeleteReport: (reportId: string) => Promise<boolean>;
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const useExplorerContext = () => {
    const context = useContext(ExplorerContext);
    if (!context) {
        throw new Error('useExplorerContext must be used within an ExplorerProvider');
    }
    return context;
};

export const ExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [reportTypes, setReportTypes] = useState<ReportType[]>([]);
    const [jobFreqTypes, setJobFreqTypes] = useState<JobFreqType[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [focusedReport, setFocusedReport] = useState<FocusedReport | null>(null);
    const { token } = useAuth();

    const getAllProjects = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    };

    const getAllReportTypes = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/report-types`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch report types');
            }
            const data = await response.json();
            setReportTypes(data);
        } catch (error) {
            console.error('Error fetching report types:', error);
            throw error;
        }
    };

    const getAllJobFreqTypes = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/job-freq-types`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch job frequency types');
            }
            const data = await response.json();
            setJobFreqTypes(data);
        } catch (error) {
            console.error('Error fetching job frequency types:', error);
            throw error;
        }
    };

    const getAllModels = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/models`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const data = await response.json();
            setModels(data);
        } catch (error) {
            console.error('Error fetching models:', error);
            throw error;
        }
    };

    const createProject = async (project: { Name: string; Description: string }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(project)
            });
            if (!response.ok) {
                throw new Error('Failed to create project');
            }
            await getAllProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    const updateProject = async (project: { Id: string; Name: string; Description: string }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/${project.Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(project)
            });
            if (!response.ok) {
                throw new Error('Failed to update project');
            }
            await getAllProjects();
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    };

    const softDeleteProject = async (projectId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            await getAllProjects();
            return true;
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    };

    const createReport = async (report: {
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        modelId: string;
        datasetConfig: string;
    }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(report)
            });
            if (!response.ok) {
                throw new Error('Failed to create report');
            }
            await getAllProjects();
        } catch (error) {
            console.error('Error creating report:', error);
            throw error;
        }
    };

    const updateReport = async (report: {
        id: string;
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        modelId: string;
        datasetConfig: string;
    }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/reports/${report.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(report)
            });
            if (!response.ok) {
                throw new Error('Failed to update report');
            }
            await getAllProjects();
        } catch (error) {
            console.error('Error updating report:', error);
            throw error;
        }
    };

    const softDeleteReport = async (reportId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete report');
            }
            await getAllProjects();
            return true;
        } catch (error) {
            console.error('Error deleting report:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (token) {
            getAllProjects();
            getAllReportTypes();
            getAllJobFreqTypes();
            getAllModels();
        }
    }, [token]);

    const value = {
        projects,
        reportTypes,
        jobFreqTypes,
        models,
        focusedReport,
        getAllProjects,
        getAllReportTypes,
        getAllJobFreqTypes,
        getAllModels,
        setFocusedReport,
        createProject,
        updateProject,
        softDeleteProject,
        createReport,
        updateReport,
        softDeleteReport
    };

    return (
        <ExplorerContext.Provider value={value}>
            {children}
        </ExplorerContext.Provider>
    );
}; 