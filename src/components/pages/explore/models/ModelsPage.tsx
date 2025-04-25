import React, {useState, useEffect, useCallback} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Card,
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
    CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';
import {useExplorerContext} from '../../../context_providers/ExplorerContext';

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

const ModelsPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        models,
        modelTypes,
        getAllModels,
        getAllModelTypes,
        createModel,
        updateModel,
        softDeleteModel
    } = useExplorerContext();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [editingModel, setEditingModel] = useState<Model | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [modelToDelete, setModelToDelete] = useState<Model | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        modelConfig: '{}',
        modelTypeId: '',
    });

    useEffect(() => {
        let mounted = true;
        console.log('ModelsPage mounted');

        const fetchData = async () => {
            try {
                console.log('Starting data fetch');
                setLoading(true);
                await getAllModels();
                await getAllModelTypes();
                console.log('Data fetch complete');
                if (mounted) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            console.log('ModelsPage cleanup');
            mounted = false;
        };
    }, []); // Empty dependency array since we only want to fetch on mount

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
                name: model.Name,
                description: model.Description,
                modelConfig: model.ModelConfig,
                modelTypeId: model.ModelTypeId,
            });
        } else {
            setEditingModel(null);
            setFormData({
                name: '',
                description: '',
                modelConfig: '{}',
                modelTypeId: '',
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
            modelConfig: '{}',
            modelTypeId: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingModel) {
            await updateModel({
                id: editingModel.Id,
                name: formData.name,
                description: formData.description,
                modelConfig: formData.modelConfig,
                modelTypeId: formData.modelTypeId,
            });
        } else {
            await createModel({
                name: formData.name,
                description: formData.description,
                modelConfig: formData.modelConfig,
                modelTypeId: formData.modelTypeId,
            });
        }
        handleCloseModal();
    };

    const handleDeleteClick = (model: Model) => {
        setModelToDelete(model);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (modelToDelete) {
            await softDeleteModel(modelToDelete.Id);
            setDeleteDialogOpen(false);
            setModelToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setModelToDelete(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: "#7b6df6"}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={() => navigate(-1)}
                        sx={{mr: 2}}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        LLM Models
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{p: 3}}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Card>
                            <Box sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h5">Models</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon/>}
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
                            <Divider/>
                            {loading ? (
                                <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                                    <CircularProgress/>
                                </Box>
                            ) : models.length === 0 ? (
                                <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                                    <Typography>No models found. Create your first model!</Typography>
                                </Box>
                            ) : (
                                <>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Description</TableCell>
                                                    <TableCell>Model Type</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {models
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((model) => (
                                                        <TableRow key={model.Id}>
                                                            <TableCell>{model.Name}</TableCell>
                                                            <TableCell>{model.Description}</TableCell>
                                                            <TableCell>{model.ModelType}</TableCell>
                                                            <TableCell>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleOpenModal(model)}
                                                                >
                                                                    <EditIcon/>
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDeleteClick(model)}
                                                                    sx={{color: 'error.main'}}
                                                                >
                                                                    <DeleteIcon/>
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
                                </>
                            )}
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
                                        name="modelTypeId"
                                        value={formData.modelTypeId}
                                        onChange={handleChange}
                                        label="Model Type"
                                    >
                                        {modelTypes.map((type) => (
                                            <MenuItem key={type.Id} value={type.Id}>
                                                {type.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Config (JSON)"
                                    name="modelConfig"
                                    value={formData.modelConfig}
                                    onChange={handleChange}
                                    multiline
                                    rows={10}
                                    variant="outlined"
                                    inputProps={{style: {fontFamily: 'monospace'}}}
                                />
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Delete Model</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete "{modelToDelete?.Name}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                        sx={{
                            backgroundColor: "#ff4444",
                            '&:hover': {
                                backgroundColor: "#cc0000"
                            }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModelsPage;