import React, { useEffect } from "react";
import { Container, Box, Card, CardContent, Typography } from '@mui/material';
import DynamicReportRenderer from '../../reports/DynamicReportRenderer';
import { useExplorerContext } from '../../context_providers/ExplorerContext';
import LoadingSpinner from './LoadingSpinner';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Dashboard: React.FC = () => {
    const {
        focusedReport,
        dashboardTemplate,
        setDashboardTemplate,
        dashboardData,
        setDashboardData,
        dashboardLoading,
        dashboardError,
        fetchDashboardForReport,
    } = useExplorerContext();

    useEffect(() => {
        if (focusedReport && focusedReport.Id) {
            fetchDashboardForReport(focusedReport.Id);
        } else {
            setDashboardTemplate?.(null);
            setDashboardData?.(null);
        }
    }, [focusedReport]);

    if (!focusedReport) {
        return (
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            }}>
                <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3, borderRadius: 3 }}>
                    <CardContent sx={{ textAlign: 'center', p: 5 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            No Report Selected
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please focus or select a report to view its dashboard.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    if (dashboardLoading) return <LoadingSpinner />;
    if (dashboardError) return <Box sx={{ p: 3, color: 'red' }}>Error: {dashboardError}</Box>;
    if (!dashboardTemplate || !dashboardData) return null;

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                overflow: 'auto',
                transition: 'margin-left 0.3s ease'
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '100%' }}>
                <DynamicReportRenderer
                    template={dashboardTemplate}
                    data={dashboardData}
                    loading={false}
                    error={null}
                />
            </Container>
        </Box>
    );
};

export default Dashboard;