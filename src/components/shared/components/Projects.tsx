import React, {useState, useMemo, useEffect} from "react";
import {
    Container,
    Grid,
    Card,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Collapse,
    TablePagination,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogContentText,
    Alert,
    Snackbar, Checkbox, ListItemText
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../Modal';
import {useExplorerContext} from '../../context_providers/ExplorerContext';

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

interface ReportConfigField {
    FieldName: string;
    PossibleOptions: string[];
    FieldType: 0 | 1; // 0 for dropdown, 1 for text input
    is_multi?: boolean; // Optional property to indicate if multiple values are allowed
}

interface ReportConfig {
    Fields: ReportConfigField[];
}

interface Report {
    Id: string;
    Name: string;
    Description: string;
    ProjectId: string;
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
    Job: {
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
    } | null;
    ReportConfigurationId: string;
    DatasetConfig: string | null; // JSON string containing field values
}

interface Project {
    Id: string;
    Name: string;
    Description: string;
    Reports: Report[];
    OrganizationId?: string; // Make OrganizationId optional
}

// New Project Modal Component
interface NewProjectModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (project: { Name: string; Description: string }) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({open, onClose, onSave}) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    // Form validation
    const [nameError, setNameError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if (!projectName.trim()) {
            setNameError('Project name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave({
                Name: projectName,
                Description: description
            });
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setProjectName('');
        setDescription('');
        setNameError('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title="Create New Project"
            actions={
                <>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create Project</Button>
                </>
            }
        >
            <Box component="form" noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="projectName"
                    label="Project Name"
                    name="projectName"
                    autoFocus
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
        </Modal>
    );
};

// New Report Modal Component
interface NewReportModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (report: {
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        datasetConfig: string;
    }) => void;
    projectId: string;
    projectName: string;
}

const NewReportModal: React.FC<NewReportModalProps> = ({open, onClose, onSave, projectId, projectName}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [reportTypeId, setReportTypeId] = useState('');
    const [jobFreqTypeId, setJobFreqTypeId] = useState('');
    const [nameError, setNameError] = useState('');
    const [configValues, setConfigValues] = useState<{ [key: string]: string | string[] }>({});
    const {jobFreqTypes, reportTypes} = useExplorerContext();

    // Get current report type config
    const selectedReportType = reportTypes.find(type => type.Id === reportTypeId);

    // Reset config values when report type changes
    useEffect(() => {
        setConfigValues({});
    }, [reportTypeId]);

    const validateForm = () => {
        let isValid = true;
        if (!name.trim()) {
            setNameError('Report name is required');
            isValid = false;
        } else {
            setNameError('');
        }
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave({
                name,
                description,
                projectId,
                reportTypeId,
                jobFreqTypeId,
                datasetConfig: JSON.stringify(configValues)
            });
            onClose();
        }
    };

    const handleConfigChange = (fieldName: string, value: string | string[]) => {
        console.log(`Config change for ${fieldName}:`, value);
        setConfigValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`Create New Report for ${projectName}`}
            actions={
                <>
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create Report</Button>
                </>
            }
        >
            <Box component="form" noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Report Name"
                    name="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="report-type-label">Report Type</InputLabel>
                    <Select
                        labelId="report-type-label"
                        id="report-type"
                        value={reportTypeId}
                        label="Report Type"
                        onChange={(e) => setReportTypeId(e.target.value)}
                    >
                        {reportTypes.map((type) => (
                            <MenuItem key={type.Id} value={type.Id}>
                                {type.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Dynamic Config Fields */}
                {useMemo(() => selectedReportType?.ReportConfig.Fields.map((field) => {
                    // Ensure is_multi is a boolean and default to false if undefined
                    const isMulti = field.is_multi === true;

                    console.log(`Rendering field ${field.FieldName}:`, {
                        ...field,
                        is_multi: isMulti,
                        value: configValues[field.FieldName]
                    });

                    return (
                        <FormControl fullWidth margin="normal" key={field.FieldName}>
                            {field.FieldType === 0 ? (
                                // Dropdown field (FieldType 0)
                                <>
                                    <InputLabel id={`${field.FieldName}-label`}>{field.FieldName}</InputLabel>
                                    {isMulti ? (
                                        <Select
                                            labelId={`${field.FieldName}-label`}
                                            label={field.FieldName}
                                            multiple={field.is_multi}
                                            value={
                                                field.is_multi
                                                    ? Array.isArray(configValues[field.FieldName])
                                                        ? configValues[field.FieldName] as string[]
                                                        : []
                                                    : configValues[field.FieldName] || ''
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                console.log(`${field.is_multi ? 'Multi' : 'Single'}-select change for ${field.FieldName}:`, value);
                                                handleConfigChange(field.FieldName, value);
                                            }}
                                            renderValue={
                                                field.is_multi
                                                    ? (selected) => (selected as string[]).join(', ')
                                                    : undefined
                                            }
                                        >
                                            {field.PossibleOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {field.is_multi && (
                                                        <Checkbox
                                                            checked={configValues[field.FieldName]?.includes(option)}/>
                                                    )}
                                                    <ListItemText primary={option}/>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : (
                                        <Select
                                            labelId={`${field.FieldName}-label`}
                                            label={field.FieldName}
                                            value={configValues[field.FieldName] || ''}
                                            onChange={(e) => {
                                                console.log(`Single-select change for ${field.FieldName}:`, e.target.value);
                                                handleConfigChange(field.FieldName, e.target.value);
                                            }}
                                        >
                                            {field.PossibleOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </>
                            ) : (
                                // Text input field (FieldType 1)
                                <TextField
                                    label={field.FieldName}
                                    value={Array.isArray(configValues[field.FieldName])
                                        ? (configValues[field.FieldName] as string[]).join('\n')
                                        : configValues[field.FieldName] || ''}
                                    onChange={(e) => {
                                        if (isMulti) {
                                            // For multi-line text input, split by newlines and filter empty lines
                                            const values = e.target.value.split('\n').filter(v => v.trim());
                                            handleConfigChange(field.FieldName, values);
                                        } else {
                                            handleConfigChange(field.FieldName, e.target.value);
                                        }
                                    }}
                                    multiline={isMulti}
                                    rows={isMulti ? 4 : 1}
                                    placeholder={isMulti ? "Enter multiple values (one per line)" : ""}
                                />
                            )}
                        </FormControl>
                    );
                }), [selectedReportType, configValues])}

                <FormControl fullWidth margin="normal">
                    <InputLabel id="job-freq-type-label">Job Frequency</InputLabel>
                    <Select
                        labelId="job-freq-type-label"
                        id="job-freq-type"
                        value={jobFreqTypeId}
                        label="Job Frequency"
                        onChange={(e) => setJobFreqTypeId(e.target.value)}
                    >
                        {jobFreqTypes.map((type) => (
                            <MenuItem
                                key={type.Id}
                                value={type.Id}
                                disabled={type.Name === 'OneOff'}
                            >
                                {type.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Modal>
    );
};

interface ProjectRowProps {
    project: Project;
    onAddReport: (projectId: string, projectName: string) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({project, onAddReport}) => {
    const [open, setOpen] = useState(false);
    const [editProjectModalOpen, setEditProjectModalOpen] = useState(false);
    const [editReportModalOpen, setEditReportModalOpen] = useState(false);
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [deleteReportDialogOpen, setDeleteReportDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {
        setFocusedReport,
        updateProject,
        updateReport,
        getAllProjects,
        softDeleteProject,
        softDeleteReport
    } = useExplorerContext();

    const handleFocusReport = (report: Report) => {
        setFocusedReport({
            Id: report.Id,
            Name: report.Name
        });
    };

    const handleEditProject = async (updatedProject: {
        Id: string;
        Name: string;
        Description: string;
    }) => {
        await updateProject(updatedProject);
        await getAllProjects(); // Refresh projects after update
        setEditProjectModalOpen(false);
    };

    const handleEditReport = async (updatedReport: {
        id: string;
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        datasetConfig: string;
    }) => {
        await updateReport(updatedReport);
        await getAllProjects(); // Refresh projects after update
        setEditReportModalOpen(false);
    };

    const getJobStatus = (job: JobInfo | null) => {
        if (!job) return 'No job configured';

        // Log the entire job object for debugging
        console.log('Job object:', job);

        // Check if Status is undefined
        if (job.JobStatusType === undefined) {
            console.warn('Job status is undefined');
            return 'Not Started';
        }

        // Map the status number to text based on the enum values
        switch (job.JobStatusType) {
            case 0:
                return 'Queued';
            case 1:
                return 'Running';
            case 2:
                return 'Completed';
            case 3:
                return 'Cancelled';
            default:
                console.warn('Unknown job status value:', job.JobStatusType);
                return `Unknown (${job.JobStatusType})`;
        }
    };
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Queued':
                return 'bg-yellow-100 text-yellow-800';
            case 'Running':
                return 'bg-blue-100 text-blue-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            case 'Not Started':
                return 'bg-indigo-100 text-indigo-800';
            case 'No job configured':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };

    const getJobFrequency = (job: JobInfo | null) => {
        if (!job) return 'No job configured';
        if (!job.JobFreqType) return 'No frequency set';
        return job.JobFreqType.Name;
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Never';
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    const handleCloseError = () => {
        setError(null);
    };

    const handleDeleteProject = async () => {
        try {
            const success = await softDeleteProject(project.Id);
            if (success) {
                setDeleteProjectDialogOpen(false);
            }
        } catch (err: any) {
            setError(err.response?.data || 'Failed to delete project');
        }
    };

    const handleDeleteReport = async (report: Report) => {
        try {
            const success = await softDeleteReport(report.Id);
            if (success) {
                setDeleteReportDialogOpen(false);
            }
        } catch (err: any) {
            // Extract the error message from the API response
            const errorMessage = err.response?.data?.message || err.response?.data || err.message || 'Failed to delete report';
            setError(errorMessage);
            console.error('Error deleting report:', err);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {project.Name}
                        <IconButton
                            size="small"
                            onClick={() => setEditProjectModalOpen(true)}
                            sx={{ml: 1}}
                        >
                            <EditIcon fontSize="small"/>
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() => setDeleteProjectDialogOpen(true)}
                            sx={{ml: 1}}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Box>
                </TableCell>
                <TableCell>{project.Description}</TableCell>
                <TableCell>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={() => onAddReport(project.Id, project.Name)}
                    >
                        Add Report
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1, maxHeight: '300px', overflow: 'auto'}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Reports
                            </Typography>
                            <Table size="small" aria-label="reports" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Report Type</TableCell>
                                        <TableCell>Last Run</TableCell>
                                        <TableCell>Job Frequency</TableCell>
                                        <TableCell>Job Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {project.Reports && project.Reports.length > 0 ? (
                                        project.Reports.map((report) => (
                                            <TableRow key={report.Id}>
                                                <TableCell>
                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                        {report.Name}
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => {
                                                                setSelectedReport(report);
                                                                setTimeout(() => {
                                                                    setEditReportModalOpen(true);
                                                                }, 0);
                                                            }}
                                                            sx={{ml: 1}}
                                                        >
                                                            <EditIcon fontSize="small"/>
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => {
                                                                setSelectedReport(report);
                                                                setDeleteReportDialogOpen(true);
                                                            }}
                                                            sx={{ml: 1}}
                                                        >
                                                            <DeleteIcon fontSize="small"/>
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{report.Description}</TableCell>
                                                <TableCell>{report.ReportType.Name}</TableCell>
                                                <TableCell>{formatDate(report.Job?.LastRunDate)}</TableCell>
                                                <TableCell>{getJobFrequency(report.Job)}</TableCell>
                                                <TableCell
                                                    className={`px-4 py-2 rounded ${getStatusClass(getJobStatus(report.Job))}`}>{getJobStatus(report.Job)}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => handleFocusReport(report)}
                                                    >
                                                        Focus
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No reports found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <EditProjectModal
                open={editProjectModalOpen}
                onClose={() => setEditProjectModalOpen(false)}
                onSave={handleEditProject}
                project={project}
            />

            {selectedReport && (
                <EditReportModal
                    open={editReportModalOpen}
                    onClose={() => setEditReportModalOpen(false)}
                    onSave={handleEditReport}
                    report={selectedReport}
                    projectName={project.Name}
                />
            )}

            {/* Delete Project Confirmation Dialog */}
            <Dialog
                open={deleteProjectDialogOpen}
                onClose={() => setDeleteProjectDialogOpen(false)}
            >
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the project "{project.Name}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteProjectDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteProject} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Report Confirmation Dialog */}
            <Dialog
                open={deleteReportDialogOpen}
                onClose={() => setDeleteReportDialogOpen(false)}
            >
                <DialogTitle>Delete Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the report "{selectedReport?.Name}"? This action cannot be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteReportDialogOpen(false)}>Cancel</Button>
                    <Button onClick={() => selectedReport && handleDeleteReport(selectedReport)}
                            color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseError}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

// Add EditProjectModal component
interface EditProjectModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (project: {
        Id: string;
        Name: string;
        Description: string;
    }) => void;
    project: Project;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({open, onClose, onSave, project}) => {
    const [projectName, setProjectName] = useState(project.Name);
    const [description, setDescription] = useState(project.Description);
    const [nameError, setNameError] = useState('');

    const validateForm = () => {
        let isValid = true;
        if (!projectName.trim()) {
            setNameError('Project name is required');
            isValid = false;
        } else {
            setNameError('');
        }
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave({
                Id: project.Id,
                Name: projectName,
                Description: description
            });
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit Project"
            actions={
                <>
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
                </>
            }
        >
            <Box component="form" noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="projectName"
                    label="Project Name"
                    name="projectName"
                    autoFocus
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
        </Modal>
    );
};

// Add EditReportModal component
interface EditReportModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (report: {
        id: string;
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        datasetConfig: string;
    }) => void;
    report: Report;
    projectName: string;
}

const EditReportModal: React.FC<EditReportModalProps> = ({open, onClose, onSave, report, projectName}) => {
    const [name, setName] = useState(report?.Name || '');
    const [description, setDescription] = useState(report?.Description || '');
    const [reportTypeId, setReportTypeId] = useState(report?.ReportType?.Id || '');
    const [jobFreqTypeId, setJobFreqTypeId] = useState(report?.Job?.JobFreqType?.Id || '');
    const [nameError, setNameError] = useState('');
    const [configValues, setConfigValues] = useState<{ [key: string]: string | string[] }>({});
    const {jobFreqTypes, reportTypes} = useExplorerContext();

    // Get current report type config
    const selectedReportType = reportTypes.find(type => type.Id === reportTypeId);

    // Memoize the dynamic fields
    const dynamicFields = useMemo(() => {
        if (!selectedReportType?.ReportConfig.Fields) return [];

        return selectedReportType.ReportConfig.Fields.map((field) => {
            // Ensure is_multi is a boolean and default to false if undefined
            const isMulti = field.is_multi === true;

            console.log(`Rendering field ${field.FieldName}:`, {
                ...field,
                is_multi: isMulti,
                value: configValues[field.FieldName]
            });

            return (
                <FormControl fullWidth margin="normal" key={field.FieldName}>
                    {field.FieldType === 0 ? (
                        // Dropdown field (FieldType 0)
                        <>
                            <InputLabel id={`${field.FieldName}-label`}>{field.FieldName}</InputLabel>
                            {isMulti ? (
                                <Select
                                    labelId={`${field.FieldName}-label`}
                                    label={field.FieldName}
                                    value={Array.isArray(configValues[field.FieldName])
                                        ? configValues[field.FieldName] as string[]
                                        : []}
                                    onChange={(e) => {
                                        console.log(`Multi-select change for ${field.FieldName}:`, e.target.value);
                                        handleConfigChange(field.FieldName, e.target.value);
                                    }}
                                    multiple
                                    renderValue={(selected) => (selected as string[]).join(', ')}
                                >
                                    {field.PossibleOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <Select
                                    labelId={`${field.FieldName}-label`}
                                    label={field.FieldName}
                                    value={configValues[field.FieldName] || ''}
                                    onChange={(e) => {
                                        console.log(`Single-select change for ${field.FieldName}:`, e.target.value);
                                        handleConfigChange(field.FieldName, e.target.value);
                                    }}
                                >
                                    {field.PossibleOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </>
                    ) : (
                        // Text input field (FieldType 1)
                        <TextField
                            label={field.FieldName}
                            value={Array.isArray(configValues[field.FieldName])
                                ? (configValues[field.FieldName] as string[]).join('\n')
                                : configValues[field.FieldName] || ''}
                            onChange={(e) => {
                                if (isMulti) {
                                    // For multi-line text input, split by newlines and filter empty lines
                                    const values = e.target.value.split('\n').filter(v => v.trim());
                                    handleConfigChange(field.FieldName, values);
                                } else {
                                    handleConfigChange(field.FieldName, e.target.value);
                                }
                            }}
                            multiline={isMulti}
                            rows={isMulti ? 4 : 1}
                            placeholder={isMulti ? "Enter multiple values (one per line)" : ""}
                        />
                    )}
                </FormControl>
            );
        });
    }, [selectedReportType, configValues]);

    // Update local state when report changes
    useEffect(() => {
        console.log('Report changed:', report);
        if (report) {
            setName(report.Name);
            setDescription(report.Description);
            setReportTypeId(report.ReportType.Id);
            setJobFreqTypeId(report.Job?.JobFreqType?.Id || '');

            // Parse datasetConfig if it exists
            if (report.DatasetConfig) {
                try {
                    console.log('Parsing dataset config:', report.DatasetConfig);
                    const parsedConfig = JSON.parse(report.DatasetConfig);
                    console.log('Parsed config:', parsedConfig);
                    setConfigValues(parsedConfig);
                } catch (error) {
                    console.error('Error parsing dataset config:', error);
                    setConfigValues({});
                }
            } else {
                console.log('No dataset config found');
                setConfigValues({});
            }
        }
    }, [report, open]); // Add 'open' to dependency array to ensure it runs when modal opens

    // Reset config values when report type changes
    useEffect(() => {
        // Only reset config values if the report type has changed from the original report type
        if (reportTypeId && reportTypeId !== report?.ReportType?.Id) {
            console.log('Report type changed from original, resetting config values');
            setConfigValues({});
        }
    }, [reportTypeId, report?.ReportType?.Id]);

    if (!report) return null;

    const validateForm = () => {
        let isValid = true;
        if (!name.trim()) {
            setNameError('Report name is required');
            isValid = false;
        } else {
            setNameError('');
        }
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave({
                id: report.Id,
                name,
                description,
                projectId: report.ProjectId,
                reportTypeId,
                jobFreqTypeId,
                datasetConfig: JSON.stringify(configValues)
            });
            onClose();
        }
    };

    const handleConfigChange = (fieldName: string, value: string | string[]) => {
        console.log(`Config change for ${fieldName}:`, value);
        setConfigValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`Edit Report for ${projectName}`}
            actions={
                <>
                    <Button onClick={onClose} variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
                </>
            }
        >
            <Box component="form" noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Report Name"
                    name="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="report-type-label">Report Type</InputLabel>
                    <Select
                        labelId="report-type-label"
                        id="report-type"
                        value={reportTypeId}
                        label="Report Type"
                        onChange={(e) => setReportTypeId(e.target.value)}
                    >
                        {reportTypes.map((type) => (
                            <MenuItem key={type.Id} value={type.Id}>
                                {type.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Dynamic Config Fields */}
                {dynamicFields}

                <FormControl fullWidth margin="normal">
                    <InputLabel id="job-freq-type-label">Job Frequency</InputLabel>
                    <Select
                        labelId="job-freq-type-label"
                        id="job-freq-type"
                        value={jobFreqTypeId}
                        label="Job Frequency"
                        onChange={(e) => setJobFreqTypeId(e.target.value)}
                    >
                        {jobFreqTypes.map((type) => (
                            <MenuItem
                                key={type.Id}
                                value={type.Id}
                                disabled={type.Name === 'OneOff'}
                            >
                                {type.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Modal>
    );
};

const Projects: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
    const [newReportModalOpen, setNewReportModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');
    const [selectedProjectName, setSelectedProjectName] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        projects,
        getAllProjects,
        createProject,
        createReport
    } = useExplorerContext();

    // Fetch projects on initial load
    useEffect(() => {
        if (isInitialLoad) {
            getAllProjects().catch(err => {
                setError(err.response?.data || 'Failed to fetch projects');
            });
            setIsInitialLoad(false);
        }
    }, [isInitialLoad, getAllProjects]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddReport = (projectId: string, projectName: string) => {
        setSelectedProjectId(projectId);
        setSelectedProjectName(projectName);
        setNewReportModalOpen(true);
    };

    const handleCreateProject = async (newProject: { Name: string; Description: string }) => {
        try {
            await createProject(newProject);
            await getAllProjects();
        } catch (err: any) {
            setError(err.response?.data || 'Failed to create project');
        }
    };

    const handleCreateReport = async (report: {
        name: string;
        description: string;
        projectId: string;
        reportTypeId: string;
        jobFreqTypeId: string;
        datasetConfig: string;
    }) => {
        try {
            await createReport({
                name: report.name,
                description: report.description,
                projectId: report.projectId,
                reportTypeId: report.reportTypeId,
                jobFreqTypeId: report.jobFreqTypeId,
                datasetConfig: report.datasetConfig
            });
            // Refresh projects to get the updated report data
            await getAllProjects();
            setNewReportModalOpen(false);
        } catch (err: any) {
            setError(err.response?.data || 'Failed to create report');
        }
    };

    return (
        <Container maxWidth="lg"
                   sx={{mt: 4, mb: 4, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column'}}>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={() => setError(null)} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
            <Grid container spacing={3} sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Grid item xs={12} sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Card sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h5">Projects</Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon/>}
                                onClick={() => setNewProjectModalOpen(true)}
                            >
                                New Project
                            </Button>
                        </Box>
                        <Divider/>
                        <TableContainer sx={{flex: 1, overflow: 'auto', maxHeight: 'calc(100vh - 250px)'}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((project) => (
                                            <ProjectRow
                                                key={project.Id}
                                                project={project}
                                                onAddReport={handleAddReport}
                                            />
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={projects.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Grid>
            </Grid>

            <NewProjectModal
                open={newProjectModalOpen}
                onClose={() => setNewProjectModalOpen(false)}
                onSave={handleCreateProject}
            />

            <NewReportModal
                open={newReportModalOpen}
                onClose={() => setNewReportModalOpen(false)}
                onSave={handleCreateReport}
                projectId={selectedProjectId}
                projectName={selectedProjectName}
            />
        </Container>
    );
};

export default Projects;