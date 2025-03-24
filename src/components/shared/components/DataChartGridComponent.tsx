import React from 'react';
import {Grid, Card, Typography, Box, CardProps} from '@mui/material';
import {Chart} from 'react-chartjs-2';
import 'chart.js/auto';
import {ChartType} from 'chart.js';

/**
 * Enum for component sizes
 * Maps to different responsive grid breakpoints
 */
export const SizeOptions = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
} as const;

export type SizeOption = typeof SizeOptions[keyof typeof SizeOptions];

/**
 * Enum for chart types
 */
export const ChartTypes = {
    BAR: 'bar',
    LINE: 'line',
    PIE: 'pie',
    DOUGHNUT: 'doughnut',
    POLAR_AREA: 'polarArea',
    RADAR: 'radar',
    SCATTER: 'scatter',
    BUBBLE: 'bubble'
} as const;

export type ChartTypeOption = typeof ChartTypes[keyof typeof ChartTypes];

interface DataChartGridComponentProps {
    /** Size option to determine grid responsiveness */
    size?: SizeOption;
    /** Type of chart to display (from ChartTypes) */
    chartType?: ChartType;
    /** Chart.js data object with labels and datasets */
    data: any;
    /** Chart.js options configuration */
    options?: any;
    /** Title of the chart card */
    title?: string;
    /** Minimum height of the chart in pixels */
    minHeight?: number;
    /** Additional props to pass to the Card component */
    cardProps?: Omit<CardProps, 'sx'> & { sx?: CardProps['sx'] };
}

/**
 * Component for displaying chart data within a responsive grid
 */
const DataChartGridComponent: React.FC<DataChartGridComponentProps> = ({
                                                                           size = SizeOptions.MEDIUM,
                                                                           chartType = ChartTypes.BAR,
                                                                           data,
                                                                           options = {},
                                                                           title = 'Data Chart',
                                                                           minHeight = 250,
                                                                           cardProps = {}
                                                                       }) => {
    // Map size enum to grid sizes
    const gridSizes = {
        [SizeOptions.SMALL]: {xs: 12, sm: 12, md: 6, lg: 4, xl: 3},
        [SizeOptions.MEDIUM]: {xs: 12, sm: 12, md: 8, lg: 6, xl: 4},
        [SizeOptions.LARGE]: {xs: 12, sm: 12, md: 12, lg: 8, xl: 6}
    };

    // Get grid props based on selected size
    const gridProps = gridSizes[size] || gridSizes[SizeOptions.MEDIUM];

    // Default chart options for better responsive behavior
    const defaultOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        ...options
    };

    return (
        <Grid item {...gridProps}>
            <Card
                sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...cardProps.sx
                }}
                {...cardProps}
            >
                <Typography variant="h6" sx={{mb: 2}}>
                    {title}
                </Typography>
                <Box sx={{flexGrow: 1, minHeight: {xs: `${minHeight}px`, md: `${minHeight - 50}px`}}}>
                    {data && data.datasets && data.datasets.length > 0 ? (
                        <Chart type={chartType} data={data} options={defaultOptions}/>
                    ) : (
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                No data available
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Card>
        </Grid>
    );
};

export default DataChartGridComponent;