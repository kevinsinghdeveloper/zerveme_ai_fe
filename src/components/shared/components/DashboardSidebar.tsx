import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReusableSidebar, {SidebarMenuItem} from './ReusableSidebar';

interface DashboardSidebarProps {
    open: boolean;
    expandedWidth?: number;
    collapsedWidth?: number;
    activeItem: string | null;
    setActiveItem: (item: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    open,
    expandedWidth = 240,
    collapsedWidth = 64,
    activeItem,
    setActiveItem
}) => {
    // Define menu items
    const dashboardMenuItems: SidebarMenuItem[] = [
        {
            icon: <DashboardIcon/>,
            text: 'Dashboard',
            onClick: () => {
                setActiveItem('Dashboard');
            }
        },
        {
            icon: <TableChartIcon/>,
            text: 'Projects',
            onClick: () => {
                setActiveItem('Projects');
            }
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
        />
    );
};

export default DashboardSidebar;