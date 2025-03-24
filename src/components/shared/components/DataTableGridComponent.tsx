import React from 'react';
import {
    Grid,
    Card,
    Typography,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CardProps
} from '@mui/material';

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
 * Interface for column definition
 */
export interface ColumnDef {
    /** Field name in the data object */
    field: string;
    /** Header label to display */
    headerName: string;
    /** Width of the column (optional) */
    width?: number | string;
    /** Custom render function for cell content */
    renderCell?: (value: any, rowData: any, rowIndex: number) => React.ReactNode;
}

interface DataTableGridComponentProps {
    /** Size option to determine grid responsiveness */
    size?: SizeOption;
    /** Column definitions for the table */
    columns: ColumnDef[];
    /** Data to be displayed in the table */
    data: any[];
    /** Title of the table card */
    title?: string;
    /** Table size (small or medium) */
    tableSize?: 'small' | 'medium';
    /** Additional props to pass to the Card component */
    cardProps?: Omit<CardProps, 'sx'> & { sx?: CardProps['sx'] };
}

/**
 * Component for displaying tabular data within a responsive grid
 */
const DataTableGridComponent: React.FC<DataTableGridComponentProps> = ({
                                                                           size = SizeOptions.SMALL,
                                                                           columns,
                                                                           data,
                                                                           title = 'Data Table',
                                                                           tableSize = 'small',
                                                                           cardProps = {}
                                                                       }) => {
    // Map size enum to grid sizes
    const gridSizes = {
        [SizeOptions.SMALL]: {xs: 12, sm: 6, md: 4, lg: 3, xl: 2},
        [SizeOptions.MEDIUM]: {xs: 12, sm: 12, md: 8, lg: 6, xl: 4},
        [SizeOptions.LARGE]: {xs: 12, sm: 12, md: 12, lg: 8, xl: 6}
    };

    // Get grid props based on selected size
    const gridProps = gridSizes[size] || gridSizes[SizeOptions.SMALL];

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
                <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                    {data && data.length > 0 ? (
                        <Table size={tableSize}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.field}
                                            sx={column.width ? {width: column.width} : undefined}
                                        >
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {columns.map((column) => (
                                            <TableCell key={`${rowIndex}-${column.field}`}>
                                                {column.renderCell
                                                    ? column.renderCell(row[column.field], row, rowIndex)
                                                    : row[column.field]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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

export default DataTableGridComponent;