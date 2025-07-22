import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    LinearProgress,
    CircularProgress,
} from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {
    ReportTemplate,
    ReportData,
    Section,
    TextSection,
    TableSection,
    ChartSection,
    GridSection,
    ChartType,
} from '../../types/reportTemplates';

// Register Chart.js components
ChartJS.register(...registerables);

interface DynamicReportRendererProps {
    template: ReportTemplate;
    data: ReportData;
    loading?: boolean;
    error?: string | null;
}

// Utility function to format values
const formatValue = (value: any, format?: string, prefix?: string, suffix?: string): string => {
    if (value === null || value === undefined) return 'N/A';
    
    let formattedValue = value;
    
    switch (format) {
        case 'currency':
            formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(Number(value));
            break;
        case 'percentage':
            formattedValue = `${Number(value).toFixed(2)}%`;
            break;
        case 'number':
            formattedValue = new Intl.NumberFormat('en-US').format(Number(value));
            break;
        default:
            formattedValue = String(value);
    }
    
    return `${prefix || ''}${formattedValue}${suffix || ''}`;
};

// Text/Metric Component
const TextComponent: React.FC<{ section: TextSection; data: ReportData }> = ({ section, data }) => {
    const value = data[section.field];
    const formattedValue = formatValue(value, section.format, section.prefix, section.suffix);
    
    const getColor = (color?: string) => {
        switch (color) {
            case 'success': return 'success.main';
            case 'warning': return 'warning.main';
            case 'error': return 'error.main';
            case 'info': return 'info.main';
            case 'secondary': return 'secondary.main';
            default: return 'primary.main';
        }
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {section.title}
                </Typography>
                <Typography 
                    variant="h3" 
                    component="div" 
                    sx={{ 
                        color: getColor(section.color),
                        fontWeight: 'bold',
                        mb: 1
                    }}
                >
                    {formattedValue}
                </Typography>
            </CardContent>
        </Card>
    );
};

// Table Component
const TableComponent: React.FC<{ section: TableSection; data: ReportData }> = ({ section, data }) => {
    const tableData = data[section.field] || [];
    const maxHeight = section.height || 300;
    
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {section.title}
                </Typography>
                <Box sx={{ maxHeight, overflow: 'auto' }}>
                    <TableContainer component={Paper} sx={{ maxHeight: 'unset' }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    {section.columns.map((column) => (
                                        <TableCell key={column.field} align={column.align as any}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row: any, index: number) => (
                                    <TableRow key={index}>
                                        {section.columns.map((column) => {
                                            const value = row[column.field];
                                            const formattedValue = formatValue(value, column.format);
                                            
                                            return (
                                                <TableCell key={column.field} align={column.align as any}>
                                                    {column.renderCell
                                                        ? column.renderCell(value, row)
                                                        : column.format === 'html'
                                                            ? <span style={{ pointerEvents: 'auto', display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: value }} />
                                                            : formattedValue}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

// Chart Component
const ChartComponent: React.FC<{ section: ChartSection; data: ReportData }> = ({ section, data }) => {
    const chartData = data[section.dataField] || [];
    
    const getChartData = () => {
        if (section.chartType === 'pie' || section.chartType === 'doughnut') {
            return {
                labels: chartData.map((item: any) => item[section.xField || 'label']),
                datasets: [{
                    data: chartData.map((item: any) => item[section.yField || 'value']),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                }]
            };
        }
        
        return {
            labels: chartData.map((item: any) => item[section.xField || 'label']),
            datasets: [{
                label: section.title,
                data: chartData.map((item: any) => item[section.yField || 'value']),
                backgroundColor: 'rgba(123, 109, 246, 0.2)',
                borderColor: 'rgba(123, 109, 246, 1)',
                borderWidth: 2,
            }]
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: section.title,
            },
        },
        ...section.options,
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ height: 300, position: 'relative' }}>
                    <Chart type={section.chartType as any} data={getChartData()} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

// Grid Component
const GridComponent: React.FC<{ section: GridSection; data: ReportData }> = ({ section, data }) => {
    const items = data[section.itemsField] || [];
    
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {section.title}
                </Typography>
                <Grid container spacing={section.spacing || 2}>
                    {items.map((item: any, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {section.itemTemplate.title}
                                    </Typography>
                                    <Typography variant="h6">
                                        {formatValue(item[section.itemTemplate.field], section.itemTemplate.format)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

// Main renderer component
const DynamicReportRenderer: React.FC<DynamicReportRendererProps> = ({
    template,
    data,
    loading = false,
    error = null,
}) => {
    const renderSection = (section: Section) => {
        switch (section.component) {
            case 'Text':
            case 'Metric':
                return <TextComponent section={section as TextSection} data={data} />;
            case 'Table':
                return <TableComponent section={section as TableSection} data={data} />;
            case 'Chart':
                return <ChartComponent section={section as ChartSection} data={data} />;
            case 'Grid':
                return <GridComponent section={section as GridSection} data={data} />;
            default:
                return (
                    <Card>
                        <CardContent>
                            <Typography color="error">
                                Unknown component type: {(section as any).component}
                            </Typography>
                        </CardContent>
                    </Card>
                );
        }
    };

    // Group sections by row if 'row' property exists
    const hasRowGrouping = template.sections.some((section: any) => section.row !== undefined);
    let groupedSections: { [row: string]: Section[] } = {};
    if (hasRowGrouping) {
        template.sections.forEach((section: any) => {
            const rowKey = section.row !== undefined ? String(section.row) : 'default';
            if (!groupedSections[rowKey]) groupedSections[rowKey] = [];
            groupedSections[rowKey].push(section);
        });
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent>
                    <Typography color="error" variant="h6">
                        Error: {error}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {template.title}
            </Typography>
            {template.description && (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {template.description}
                </Typography>
            )}
            {/* Render grouped rows if present, else fallback to flat sections */}
            {hasRowGrouping ? (
                Object.keys(groupedSections).sort().map((rowKey, rowIdx) => (
                    <Grid container spacing={3} key={rowKey} sx={{ mb: 1 }}>
                        {groupedSections[rowKey].map((section, index) => (
                            <Grid
                                item
                                xs={12}
                                md={typeof section.width === 'number' ? section.width : parseInt(section.width || '12', 10)}
                                key={index}
                                sx={{ height: section.height || 'auto' }}
                            >
                                {renderSection(section)}
                            </Grid>
                        ))}
                    </Grid>
                ))
            ) : (
                <Grid container spacing={3}>
                    {template.sections.map((section, index) => (
                        <Grid
                            item
                            xs={12}
                            md={typeof section.width === 'number' ? section.width : parseInt(section.width || '12', 10)}
                            key={index}
                            sx={{ height: section.height || 'auto' }}
                        >
                            {renderSection(section)}
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default DynamicReportRenderer; 