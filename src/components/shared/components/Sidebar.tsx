import React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';

interface SidebarProps {
    open: boolean;
    expandedWidth: number;
    collapsedWidth: number;
}

// Sidebar menu items with icons and labels
const menuItems = [
    {icon: <DashboardIcon/>, text: 'Dashboard'},
    {icon: <BarChartIcon/>, text: 'Charts'},
    {icon: <TableChartIcon/>, text: 'Tables'}
];

const Sidebar: React.FC<SidebarProps> = ({open, expandedWidth, collapsedWidth}) => {
    return (
        <Box
            sx={{
                width: open ? expandedWidth : collapsedWidth,
                height: '100%',
                backgroundColor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                transition: 'width 0.3s ease',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flexShrink: 0 // Prevent sidebar from shrinking
            }}
        >
            <List>
                <ListItem sx={{justifyContent: open ? 'flex-start' : 'center'}}>
                    {open ? (
                        <Typography variant="h6">Menu</Typography>
                    ) : (
                        <Typography variant="h6" sx={{fontSize: '1.5rem'}}>M</Typography>
                    )}
                </ListItem>
                <Divider/>
                {menuItems.map((item, index) => (
                    <Tooltip
                        key={index}
                        title={!open ? item.text : ''}
                        placement="right"
                        disableHoverListener={open}
                    >
                        <ListItem
                            button
                            sx={{
                                justifyContent: open ? 'flex-start' : 'center',
                                px: open ? 2 : 1
                            }}
                        >
                            <ListItemIcon sx={{minWidth: open ? 36 : 24, justifyContent: 'center'}}>
                                {item.icon}
                            </ListItemIcon>
                            {open && <ListItemText primary={item.text}/>}
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;