import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        neutral?: Palette['primary'];
    }
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

const baseTheme: ThemeOptions = {
    palette: {
        primary: {
            main: '#7b6df6', // Your current purple color
            light: '#9b8bf8',
            dark: '#5b4dd4',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f50057',
            light: '#ff5983',
            dark: '#c51162',
        },
        background: {
            default: '#1e1621', // Your current dark background
            paper: '#2d1f2d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2d1f2d',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(123, 109, 246, 0.08)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    color: '#ffffff',
                },
                body: {
                    color: '#ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(123, 109, 246, 0.3)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7b6df6',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': {
                            color: '#7b6df6',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#ffffff',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#7b6df6',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#2d1f2d',
                    color: '#ffffff',
                    borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(123, 109, 246, 0.16)',
                        '&:hover': {
                            backgroundColor: 'rgba(123, 109, 246, 0.24)',
                        },
                    },
                },
            },
        },
    },
};

export const theme = createTheme(baseTheme);

export default theme; 