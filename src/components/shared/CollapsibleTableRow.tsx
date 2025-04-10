import React, { useState } from 'react';
import {
    TableRow,
    TableCell,
    Box,
    Collapse,
    IconButton,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface CollapsibleTableRowProps {
    cells: React.ReactNode[];
    children?: React.ReactNode;
}

const CollapsibleTableRow: React.FC<CollapsibleTableRowProps> = ({
    cells,
    children,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow>
                {children && (
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                )}
                {cells.map((cell, index) => (
                    <TableCell key={index}>{cell}</TableCell>
                ))}
            </TableRow>
            {children && (
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={cells.length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {children}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default CollapsibleTableRow; 