import React, {useState} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Card,
    CardContent,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

interface Model {
    id: string;
    name: string;
    description: string;
    modelType: string;
    createdAt: string;
    updatedAt: string;
}

const dummyModels: Model[] = [
    {
        id: '1',
        name: 'Customer Support Bot',
        description: 'AI model trained to handle customer support queries and provide accurate responses',
        modelType: 'gpt-4',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-20T14:30:00Z'
    },
    {
        id: '2',
        name: 'Content Generator',
        description: 'Specialized model for generating marketing content and blog posts',
        modelType: 'gpt-3.5-turbo',
        createdAt: '2024-02-28T09:15:00Z',
        updatedAt: '2024-03-18T11:45:00Z'
    },
    {
        id: '3',
        name: 'Data Analysis Assistant',
        description: 'Model designed to help with data analysis and visualization tasks',
        modelType: 'claude-3',
        createdAt: '2024-03-10T13:20:00Z',
        updatedAt: '2024-03-19T16:10:00Z'
    },
    {
        id: '4',
        name: 'Code Review Bot',
        description: 'AI assistant for reviewing and suggesting improvements to code',
        modelType: 'claude-2',
        createdAt: '2024-03-05T08:30:00Z',
        updatedAt: '2024-03-17T15:20:00Z'
    },
    {
        id: '5',
        name: 'Document Summarizer',
        description: 'Model specialized in summarizing long documents and extracting key points',
        modelType: 'llama-2',
        createdAt: '2024-03-01T11:45:00Z',
        updatedAt: '2024-03-16T09:30:00Z'
    },
    {
        id: '6',
        name: 'Language Translator',
        description: 'Advanced translation model supporting multiple languages',
        modelType: 'gpt-4',
        createdAt: '2024-02-25T14:15:00Z',
        updatedAt: '2024-03-15T10:20:00Z'
    },
    {
        id: '7',
        name: 'Research Assistant',
        description: 'AI model for conducting research and compiling information',
        modelType: 'claude-3',
        createdAt: '2024-03-08T16:30:00Z',
        updatedAt: '2024-03-14T13:45:00Z'
    },
    {
        id: '8',
        name: 'Email Writer',
        description: 'Model trained to write professional emails and communications',
        modelType: 'gpt-3.5-turbo',
        createdAt: '2024-02-20T09:00:00Z',
        updatedAt: '2024-03-13T11:30:00Z'
    },
    {
        id: '9',
        name: 'Meeting Notes Generator',
        description: 'AI assistant for generating meeting notes and action items',
        modelType: 'claude-2',
        createdAt: '2024-03-12T10:45:00Z',
        updatedAt: '2024-03-12T10:45:00Z'
    },
    {
        id: '10',
        name: 'Social Media Manager',
        description: 'Model for creating and managing social media content',
        modelType: 'gpt-4',
        createdAt: '2024-02-15T13:20:00Z',
        updatedAt: '2024-03-11T14:15:00Z'
    }
];

const ModelsPage: React.FC = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [models, setModels] = useState<Model[]>(dummyModels); // Using dummy data
    const [openModal, setOpenModal] = useState(false);
    const [editingModel, setEditingModel] = useState<Model | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        modelType: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name as string]: value
        }));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (model?: Model) => {
        if (model) {
            setEditingModel(model);
            setFormData({
                name: model.name,
                description: model.description,
                modelType: model.modelType,
            });
        } else {
            setEditingModel(null);
            setFormData({
                name: '',
                description: '',
                modelType: '',
            });
        }
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingModel(null);
        setFormData({
            name: '',
            description: '',
            modelType: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API integration when available
        console.log('Form submitted:', formData);
        handleCloseModal();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#7b6df6" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={() => navigate(-1)}
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        LLM Models
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Card>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h5">Models</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleOpenModal()}
                                    sx={{ 
                                        backgroundColor: "#7b6df6",
                                        '&:hover': {
                                            backgroundColor: "#6a5de5"
                                        }
                                    }}
                                >
                                    New Model
                                </Button>
                            </Box>
                            <Divider />
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Model Type</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>Updated At</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {models
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((model) => (
                                                <TableRow key={model.id}>
                                                    <TableCell>{model.name}</TableCell>
                                                    <TableCell>{model.description}</TableCell>
                                                    <TableCell>{model.modelType}</TableCell>
                                                    <TableCell>{new Date(model.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell>{new Date(model.updatedAt).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleOpenModal(model)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={models.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Model Form Modal */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{editingModel ? 'Edit Model' : 'Create New Model'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Model Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel>Model Type</InputLabel>
                                    <Select
                                        name="modelType"
                                        value={formData.modelType}
                                        onChange={handleChange}
                                        label="Model Type"
                                    >
                                        <MenuItem value="gpt-4">GPT-4</MenuItem>
                                        <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                                        <MenuItem value="claude-2">Claude 2</MenuItem>
                                        <MenuItem value="claude-3">Claude 3</MenuItem>
                                        <MenuItem value="llama-2">Llama 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ 
                            backgroundColor: "#7b6df6",
                            '&:hover': {
                                backgroundColor: "#6a5de5"
                            }
                        }}>
                            {editingModel ? 'Save Changes' : 'Create Model'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default ModelsPage;