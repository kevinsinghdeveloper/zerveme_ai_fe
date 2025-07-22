import { ReportData } from '../types/reportTemplates';

interface DashboardFilters {
    dateRange: string;
    categories: string[];
    region: string;
}

export const generateDashboardData = (filters: DashboardFilters): ReportData => {
    // Base data
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    const regions = ['North', 'South', 'East', 'West', 'Central'];
    const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];

    // Apply filters to determine data range
    let filteredMonths = [...months];
    let filteredValues = [65, 59, 80, 81, 56, 55];

    switch (filters.dateRange) {
        case 'last7days':
            filteredMonths = months.slice(-1);
            filteredValues = filteredValues.slice(-1);
            break;
        case 'last30days':
            filteredMonths = months.slice(-2);
            filteredValues = filteredValues.slice(-2);
            break;
        case 'last90days':
            filteredMonths = months.slice(-3);
            filteredValues = filteredValues.slice(-3);
            break;
        case 'lastYear':
            // All data
            break;
        default:
            // All data
            break;
    }

    // Apply region filter
    if (filters.region !== 'all') {
        filteredValues = filteredValues.map(value =>
            value * (filters.region === 'North' ? 1.2 :
                filters.region === 'South' ? 0.8 :
                    filters.region === 'East' ? 1.1 :
                        filters.region === 'West' ? 0.9 : 1.0)
        );
    }

    // Calculate total sales
    const totalSales = filteredValues.reduce((sum, value) => sum + value, 0);
    
    // Calculate growth (comparing to previous period)
    const previousTotal = filteredValues.slice(0, -1).reduce((sum, value) => sum + value, 0);
    const currentTotal = filteredValues.slice(-1)[0] || 0;
    const salesGrowth = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

    // Generate sales overview data
    const salesOverview = filteredMonths.map((month, index) => ({
        month,
        sales: filteredValues[index]
    }));

    // Generate sales by month table data
    const salesByMonth = filteredMonths.map((month, index) => ({
        month,
        sales: filteredValues[index],
        growth: index > 0 ? ((filteredValues[index] - filteredValues[index - 1]) / filteredValues[index - 1]) * 100 : 0
    }));

    // Generate monthly trends (same as sales overview but for line chart)
    const monthlyTrends = salesOverview;

    // Generate categories data
    const selectedCategories = filters.categories.length > 0 ? filters.categories : categories;
    const categoriesData = selectedCategories.map(cat => {
        let value = 0;
        switch (cat) {
            case 'Electronics':
                value = 30;
                break;
            case 'Clothing':
                value = 25;
                break;
            case 'Food':
                value = 20;
                break;
            case 'Books':
                value = 15;
                break;
            case 'Sports':
                value = 10;
                break;
            default:
                value = Math.random() * 30;
        }
        return {
            category: cat,
            value
        };
    });

    // Generate target vs actual data
    const targetVsActual = [
        { label: 'Target', value: 65 },
        { label: 'Actual', value: 35 }
    ];

    // Generate regional performance data
    const regionalPerformance = regions.map(region => ({
        region,
        performance: Math.floor(Math.random() * 100) + 20
    }));

    return {
        totalSales,
        salesGrowth,
        salesOverview,
        salesByMonth,
        monthlyTrends,
        categories: categoriesData,
        targetVsActual,
        regionalPerformance
    };
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

// Helper function to format percentage
export const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
}; 