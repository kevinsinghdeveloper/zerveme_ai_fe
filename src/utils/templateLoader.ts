import { ReportTemplate, ReportData } from '../types/reportTemplates';

// Import templates
import salesDashboardTemplate from '../templates/salesDashboardTemplate.json';

// Import data
import salesDashboardData from '../data/salesDashboardData.json';

// Template registry
const templateRegistry: Record<string, ReportTemplate> = {
    'sales-dashboard': salesDashboardTemplate as ReportTemplate,
};

// Data registry
const dataRegistry: Record<string, ReportData> = {
    'sales-dashboard': salesDashboardData as ReportData,
};

/**
 * Load a template by name
 * @param templateName - The name of the template to load
 * @returns The template or null if not found
 */
export const loadTemplate = (templateName: string): ReportTemplate | null => {
    return templateRegistry[templateName] || null;
};

/**
 * Load data by name
 * @param dataName - The name of the data to load
 * @returns The data or null if not found
 */
export const loadData = (dataName: string): ReportData | null => {
    return dataRegistry[dataName] || null;
};

/**
 * Load both template and data by name
 * @param name - The name of the template/data pair
 * @returns Object with template and data, or null if not found
 */
export const loadTemplateAndData = (name: string): { template: ReportTemplate; data: ReportData } | null => {
    const template = loadTemplate(name);
    const data = loadData(name);
    
    if (template && data) {
        return { template, data };
    }
    
    return null;
};

/**
 * Get list of available templates
 * @returns Array of template names
 */
export const getAvailableTemplates = (): string[] => {
    return Object.keys(templateRegistry);
};

/**
 * Get list of available data sets
 * @returns Array of data names
 */
export const getAvailableDataSets = (): string[] => {
    return Object.keys(dataRegistry);
};

/**
 * Register a new template
 * @param name - The name to register the template under
 * @param template - The template to register
 */
export const registerTemplate = (name: string, template: ReportTemplate): void => {
    templateRegistry[name] = template;
};

/**
 * Register new data
 * @param name - The name to register the data under
 * @param data - The data to register
 */
export const registerData = (name: string, data: ReportData): void => {
    dataRegistry[name] = data;
};

/**
 * Load template and data from API
 * @param templateId - The ID of the template to load from API
 * @param dataId - The ID of the data to load from API
 * @returns Promise with template and data
 */
export const loadFromAPI = async (templateId: string, dataId?: string): Promise<{ template: ReportTemplate; data: ReportData } | null> => {
    try {
        // This is where you would make API calls to your C# backend
        // For now, we'll return null to indicate API loading is not implemented
        console.log(`Loading template ${templateId} and data ${dataId} from API`);
        return null;
    } catch (error) {
        console.error('Error loading from API:', error);
        return null;
    }
}; 