import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CollapsibleTableProps {
    headers: string[];
    children: React.ReactNode;
    title?: string;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({
    headers,
    children,
    title,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            {title && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        mb: 1,
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Box>
            )}
            {!isCollapsed && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell key={index}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>{children}</TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default CollapsibleTable; 