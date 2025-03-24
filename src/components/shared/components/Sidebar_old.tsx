import React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Chip,
    Stack
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import FilterListIcon from '@mui/icons-material/FilterList';

interface SidebarProps {
    open: boolean;
    expandedWidth: number;
    collapsedWidth: number;
    filters: {
        dateRange: string;
        categories: string[];
        region: string;
    };
    onFilterChange: (filterName: string, value: any) => void;
}

// Sidebar menu items with icons and labels
const menuItems = [
    {icon: <DashboardIcon/>, text: 'Dashboard'},
    {icon: <BarChartIcon/>, text: 'Charts'},
    {icon: <TableChartIcon/>, text: 'Tables'},
    {icon: <FilterListIcon/>, text: 'Filters'}
];

const Sidebar: React.FC<SidebarProps> = ({
                                             open,
                                             expandedWidth,
                                             collapsedWidth,
                                             filters,
                                             onFilterChange
                                         }) => {
    const handleDateRangeChange = (event: SelectChangeEvent) => {
        onFilterChange('dateRange', event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
        onFilterChange('categories', event.target.value);
    };

    const handleRegionChange = (event: SelectChangeEvent) => {
        onFilterChange('region', event.target.value);
    };

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
                flexShrink: 0, // Prevent sidebar from shrinking
                display: 'flex',
                flexDirection: 'column'
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

            <Divider/>

            {/* Filter section */}
            {open && (
                <Box sx={{px: 2, py: 1}}>
                    <List>
                        <Typography variant="subtitle2" sx={{mb: 1}}>Filters</Typography>

                        <ListItem>
                            <FormControl fullWidth size="small" sx={{mb: 2}}>
                                <InputLabel id="date-range-label">Date Range</InputLabel>
                                <Select
                                    labelId="date-range-label"
                                    id="date-range-select"
                                    value={filters.dateRange}
                                    label="Date Range"
                                    onChange={handleDateRangeChange}
                                >
                                    <MenuItem value="last7days">Last 7 Days</MenuItem>
                                    <MenuItem value="last30days">Last 30 Days</MenuItem>
                                    <MenuItem value="last90days">Last 90 Days</MenuItem>
                                    <MenuItem value="lastYear">Last Year</MenuItem>
                                    <MenuItem value="allTime">All Time</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth size="small" sx={{mb: 2}}>
                                <InputLabel id="categories-label">Categories</InputLabel>
                                <Select
                                    labelId="categories-label"
                                    id="categories-select"
                                    multiple
                                    value={filters.categories}
                                    label="Categories"
                                    onChange={handleCategoryChange}
                                    renderValue={(selected) => (
                                        <Stack direction="row" spacing={0.5} sx={{flexWrap: 'wrap', gap: 0.5}}>
                                            {(selected as string[]).map((value) => (
                                                <Chip key={value} label={value} size="small"/>
                                            ))}
                                        </Stack>
                                    )}
                                >
                                    <MenuItem value="Electronics">Electronics</MenuItem>
                                    <MenuItem value="Clothing">Clothing</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
                                    <MenuItem value="Books">Books</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl fullWidth size="small" sx={{mb: 2}}>
                                <InputLabel id="region-label">Region</InputLabel>
                                <Select
                                    labelId="region-label"
                                    id="region-select"
                                    value={filters.region}
                                    label="Region"
                                    onChange={handleRegionChange}
                                >
                                    <MenuItem value="all">All Regions</MenuItem>
                                    <MenuItem value="North">North</MenuItem>
                                    <MenuItem value="East">East</MenuItem>
                                    <MenuItem value="South">South</MenuItem>
                                    <MenuItem value="West">West</MenuItem>
                                    <MenuItem value="Central">Central</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;