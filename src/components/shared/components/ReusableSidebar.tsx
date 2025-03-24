import React, {ReactNode} from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    Tooltip,
    BoxProps
} from '@mui/material';

/**
 * Interface for menu item structure
 */
export interface SidebarMenuItem {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
}

/**
 * Interface for filter section structure
 */
export interface SidebarFilterSection {
    title: string;
    content: ReactNode;
}

interface ReusableSidebarProps {
    /** Whether the sidebar is expanded or collapsed */
    open: boolean;
    /** Width of sidebar when expanded (in pixels or other CSS units) */
    expandedWidth: number | string;
    /** Width of sidebar when collapsed (in pixels or other CSS units) */
    collapsedWidth: number | string;
    /** Title displayed at the top of the sidebar */
    title?: string;
    /** Short form of title displayed when collapsed */
    collapsedTitle?: string;
    /** Array of menu items to display */
    menuItems: SidebarMenuItem[];
    /** Optional filter sections to display when expanded */
    filterSections?: SidebarFilterSection[];
    /** Additional props to pass to the Box component */
    boxProps?: Omit<BoxProps, 'sx'> & { sx?: BoxProps['sx'] };
}

/**
 * A reusable sidebar component that can be expanded or collapsed
 */
const ReusableSidebar: React.FC<ReusableSidebarProps> = ({
                                                             open,
                                                             expandedWidth,
                                                             collapsedWidth,
                                                             title = "Menu",
                                                             collapsedTitle = "M",
                                                             menuItems,
                                                             filterSections = [],
                                                             boxProps = {}
                                                         }) => {
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
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                ...boxProps.sx
            }}
            {...boxProps}
        >
            <List>
                <ListItem sx={{justifyContent: open ? 'flex-start' : 'center'}}>
                    {open ? (
                        <Typography variant="h6">{title}</Typography>
                    ) : (
                        <Typography variant="h6" sx={{fontSize: '1.5rem'}}>{collapsedTitle}</Typography>
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
                            onClick={item.onClick}
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

            {filterSections.length > 0 && (
                <>
                    <Divider/>

                    {/* Filter sections - only shown when expanded */}
                    {open && (
                        <Box sx={{px: 2, py: 1, overflow: 'auto'}}>
                            {filterSections.map((section, index) => (
                                <List key={index}>
                                    <Typography variant="subtitle2" sx={{mb: 1}}>
                                        {section.title}
                                    </Typography>
                                    {section.content}
                                </List>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default ReusableSidebar;