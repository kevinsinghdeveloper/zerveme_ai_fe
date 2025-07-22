import React, { Component, ReactNode } from 'react';
import { Box, Card, CardContent, Typography, Button, Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ maxWidth: 600, width: '100%' }}>
                        <CardContent sx={{ textAlign: 'center', p: 4 }}>
                            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
                            <Typography variant="h5" gutterBottom>
                                Something went wrong
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                We encountered an unexpected error. Please try refreshing the page.
                            </Typography>
                            
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                                    <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
                                        {this.state.error.toString()}
                                    </Typography>
                                </Alert>
                            )}
                            
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={this.handleRetry}
                                sx={{ mr: 1 }}
                            >
                                Try Again
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 