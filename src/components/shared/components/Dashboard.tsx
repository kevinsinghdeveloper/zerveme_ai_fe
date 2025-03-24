import React, {useMemo} from "react";
import {
    Container,
    Grid,
    Card,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Alert
} from '@mui/material';
import {Chart} from "react-chartjs-2";
import 'chart.js/auto';
import DataChartGridComponent, {ChartTypes, SizeOptions} from "./DataChartGridComponent";
import DataTableGridComponent from "./DataTableGridComponent";

interface DashboardProps {
    filters: {
        dateRange: string;
        categories: string[];
        region: string;
    };
}

const Dashboard: React.FC<DashboardProps> = ({filters}) => {
    // This would typically come from an API based on filters
    // For now, we'll simulate filtered data
    const filteredData = useMemo(() => {
        // Sample data - in a real app, this would be fetched from an API based on filters
        const baseData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        };

        // Apply date range filter
        let filteredLabels = [...baseData.labels];
        let filteredValues = [...baseData.datasets[0].data];

        switch (filters.dateRange) {
            case 'last7days':
                filteredLabels = filteredLabels.slice(-1);
                filteredValues = filteredValues.slice(-1);
                break;
            case 'last30days':
                filteredLabels = filteredLabels.slice(-2);
                filteredValues = filteredValues.slice(-2);
                break;
            case 'last90days':
                filteredLabels = filteredLabels.slice(-3);
                filteredValues = filteredValues.slice(-3);
                break;
            case 'lastYear':
                // All data (for this example)
                break;
            default:
                // All data
                break;
        }

        // Apply region filter if not "all"
        if (filters.region !== 'all') {
            // In a real app, we would filter data by region
            // For this example, we'll just modify the values slightly
            filteredValues = filteredValues.map(value =>
                value * (filters.region === 'North' ? 1.2 :
                    filters.region === 'South' ? 0.8 :
                        filters.region === 'East' ? 1.1 :
                            filters.region === 'West' ? 0.9 : 1.0)
            );
        }

        // Apply category filter
        // In a real app, this would filter to show only selected categories
        // For this example, we'll use this info in the UI

        return {
            ...baseData,
            labels: filteredLabels,
            datasets: [{
                ...baseData.datasets[0],
                data: filteredValues
            }]
        };
    }, [filters]);

    // Filter information display
    const renderFilterInfo = () => {
        return (
            <Alert severity="info" sx={{mb: 2}}>
                Showing data for: {filters.dateRange === 'allTime' ? 'All Time' :
                filters.dateRange === 'last7days' ? 'Last 7 Days' :
                    filters.dateRange === 'last30days' ? 'Last 30 Days' :
                        filters.dateRange === 'last90days' ? 'Last 90 Days' : 'Last Year'}
                {filters.region !== 'all' && ` • Region: ${filters.region}`}
                {filters.categories.length > 0 && ` • Categories: ${filters.categories.join(', ')}`}
            </Alert>
        );
    };

    // Categories data specifically filtered by selected categories
    const categoriesData = useMemo(() => {
        const allCategories = ['Electronics', 'Clothing', 'Food', 'Books'];
        const selectedCategories = filters.categories.length > 0 ?
            filters.categories : allCategories;

        return {
            labels: selectedCategories,
            datasets: [{
                data: selectedCategories.map(cat => {
                    // Assign values based on category
                    switch (cat) {
                        case 'Electronics':
                            return 30;
                        case 'Clothing':
                            return 25;
                        case 'Food':
                            return 20;
                        case 'Books':
                            return 25;
                        default:
                            return 0;
                    }
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ]
            }]
        };
    }, [filters.categories]);

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
            <Container maxWidth={false} sx={{maxWidth: '100%'}}>
                {/* Display active filters */}
                {renderFilterInfo()}

                <Grid container spacing={2}>
                    {/* Big card - twice as wide at every breakpoint */}
                    <DataChartGridComponent
                        size={SizeOptions.MEDIUM}
                        chartType={ChartTypes.BAR}
                        data={filteredData}
                        title="Sales Overview Dashboard"
                        minHeight={250}
                    />

                    {/* Regular sized cards */}
                    <DataTableGridComponent
                        size={SizeOptions.SMALL}
                        title="Sales Table"
                        columns={[
                            {field: 'month', headerName: 'Month'},
                            {field: 'sales', headerName: 'Sales'}
                        ]}
                        data={filteredData.labels.map((month, index) => ({
                            month: month,
                            sales: filteredData.datasets[0].data[index]
                        }))}
                    />

                    <DataChartGridComponent
                        size={SizeOptions.MEDIUM}
                        chartType={ChartTypes.LINE}
                        data={filteredData}
                        title="Monthly Trends"
                        minHeight={250}
                    />

                    <DataChartGridComponent
                        size={SizeOptions.SMALL}
                        chartType={ChartTypes.PIE}
                        data={categoriesData}
                        title="Categories"
                        minHeight={250}
                    />

                    <DataChartGridComponent
                        size={SizeOptions.LARGE}
                        chartType={ChartTypes.DOUGHNUT}
                        data={{
                            labels: ['Target', 'Actual'],
                            datasets: [{
                                data: [65, 35],
                                backgroundColor: [
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 99, 132, 0.6)',
                                ]
                            }]
                        }}
                        title="Target vs Actual"
                        minHeight={250}
                    />

                    <DataChartGridComponent
                        size={SizeOptions.MEDIUM}
                        chartType={ChartTypes.RADAR}
                        data={{
                            labels: ['North', 'East', 'South', 'West', 'Central'],
                            datasets: [{
                                label: 'Regional Data',
                                data: [65, 59, 90, 81, 56],
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 1
                            }]
                        }}
                        title="Target vs Actual"
                        minHeight={250}
                    />
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;