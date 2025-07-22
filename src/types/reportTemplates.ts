// Base component types
export type ComponentType = 'Text' | 'Table' | 'Chart' | 'Card' | 'Grid' | 'Metric' | 'Progress';

// Chart types
export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'area';

// Layout types
export type LayoutType = 'vertical' | 'horizontal' | 'grid' | 'dashboard';

// Base section interface
export interface BaseSection {
    type: 'card' | 'table' | 'chart' | 'metric' | 'grid';
    title: string;
    field: string;
    component: ComponentType;
    width?: number | string;
    height?: number | string;
    className?: string;
    format?: 'currency' | 'percentage' | 'number' | 'text' | 'date' | 'html';
}

// Text/Metric component
export interface TextSection extends BaseSection {
    type: 'card';
    component: 'Text' | 'Metric';
    format?: 'currency' | 'percentage' | 'number' | 'text';
    prefix?: string;
    suffix?: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

// Update BaseSection to include format
export interface BaseSection {
    type: 'card' | 'table' | 'chart' | 'metric' | 'grid';
    title: string;
    field: string;
    component: ComponentType;
    width?: number | string;
    height?: number | string;
    className?: string;
    format?: 'currency' | 'percentage' | 'number' | 'text' | 'date' | 'html';
}

// Table component
export interface TableSection extends BaseSection {
    type: 'table';
    component: 'Table';
    columns: TableColumn[];
    pagination?: boolean;
    rowsPerPage?: number;
    sortable?: boolean;
    searchable?: boolean;
}

export interface TableColumn {
    label: string;
    field: string;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    format?: 'currency' | 'percentage' | 'number' | 'date' | 'text' | 'html';
    sortable?: boolean;
    renderCell?: (value: any, row: any) => React.ReactNode;
}

// Chart component
export interface ChartSection extends BaseSection {
    type: 'chart';
    component: 'Chart';
    chartType: ChartType;
    dataField: string;
    xField?: string;
    yField?: string;
    colorField?: string;
    options?: {
        responsive?: boolean;
        maintainAspectRatio?: boolean;
        plugins?: any;
        scales?: any;
    };
}

// Grid component for multiple items
export interface GridSection extends BaseSection {
    type: 'grid';
    component: 'Grid';
    itemTemplate: BaseSection;
    itemsField: string;
    columns?: number;
    spacing?: number;
}

// Union type for all sections
export type Section = TextSection | TableSection | ChartSection | GridSection;

// Main report template interface
export interface ReportTemplate {
    type: 'report';
    title: string;
    description?: string;
    layout: LayoutType;
    sections: Section[];
    metadata?: {
        created?: string;
        updated?: string;
        version?: string;
        author?: string;
    };
    styling?: {
        theme?: 'light' | 'dark' | 'auto';
        primaryColor?: string;
        backgroundColor?: string;
    };
}

// Report data interface
export interface ReportData {
    [key: string]: any;
}

// Report instance (template + data)
export interface ReportInstance {
    template: ReportTemplate;
    data: ReportData;
    id: string;
    name: string;
    datasetId?: string;
    lastGenerated?: string;
} 