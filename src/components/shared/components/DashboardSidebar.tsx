import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Chip,
    Stack,
    ListItem
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReusableSidebar, {SidebarMenuItem, SidebarFilterSection} from './ReusableSidebar';

interface DashboardSidebarProps {
    open: boolean;
    expandedWidth?: number;
    collapsedWidth?: number;
    filters: {
        dateRange: string;
        categories: string[];
        region: string;
    };
    onFilterChange: (filterName: string, value: any) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
                                                               open,
                                                               expandedWidth = 240,
                                                               collapsedWidth = 64,
                                                               filters,
                                                               onFilterChange
                                                           }) => {
    // Handle filter changes
    const handleDateRangeChange = (event: SelectChangeEvent) => {
        onFilterChange('dateRange', event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
        onFilterChange('categories', event.target.value);
    };

    const handleRegionChange = (event: SelectChangeEvent) => {
        onFilterChange('region', event.target.value);
    };

    // Define menu items
    const dashboardMenuItems: SidebarMenuItem[] = [
        {icon: <DashboardIcon/>, text: 'Dashboard'},
        {icon: <BarChartIcon/>, text: 'Charts'},
        {icon: <TableChartIcon/>, text: 'Tables'},
        {icon: <FilterListIcon/>, text: 'Filters'}
    ];

    // Define filter sections
    const filterSections: SidebarFilterSection[] = [
        {
            title: "Filters",
            content: (
                <>
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
                </>
            )
        }
    ];

    return (
        <ReusableSidebar
            open={open}
            expandedWidth={expandedWidth}
            collapsedWidth={collapsedWidth}
            title="Menu"
            collapsedTitle="M"
            menuItems={dashboardMenuItems}
            filterSections={filterSections}
        />
    );
};

export default DashboardSidebar;