import React from "react";
import {
    Container,
    Grid,
    Card,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import {Chart} from "react-chartjs-2";
import 'chart.js/auto';

interface DashboardProps {
    // You can add props as needed, for example data fetching state or callbacks
}

const Dashboard: React.FC<DashboardProps> = () => {
    // Sample chart data
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                overflow: 'auto',
                transition: 'margin-left 0.3s ease'
            }}
        >
            <Container maxWidth={false} sx={{maxWidth: '100%'}}>
                <Grid container spacing={2}>
                    {/* Big card - twice as wide at every breakpoint */}
                    <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Sales Overview Dashboard</Typography>
                            <Box sx={{flexGrow: 1, minHeight: {xs: '250px', md: '200px'}}}>
                                <Chart type="bar" data={data}/>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Regular sized cards */}
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Sales Table</Typography>
                            <Box sx={{flexGrow: 1, overflow: 'auto'}}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Month</TableCell>
                                            <TableCell>Sales</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.labels.map((month, index) => (
                                            <TableRow key={month}>
                                                <TableCell>{month}</TableCell>
                                                <TableCell>{data.datasets[0].data[index]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={12} lg={10} xl={6}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Monthly Trends</Typography>
                            <Box sx={{flexGrow: 1}}>
                                <Chart type="line" data={data}/>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Categories</Typography>
                            <Box sx={{flexGrow: 1}}>
                                <Chart type="pie" data={{
                                    labels: ['Electronics', 'Clothing', 'Food', 'Books'],
                                    datasets: [{
                                        data: [30, 25, 20, 25],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.6)',
                                            'rgba(54, 162, 235, 0.6)',
                                            'rgba(255, 206, 86, 0.6)',
                                            'rgba(75, 192, 192, 0.6)',
                                        ]
                                    }]
                                }}/>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Performance</Typography>
                            <Box sx={{flexGrow: 1}}>
                                <Chart type="doughnut" data={{
                                    labels: ['Target', 'Actual'],
                                    datasets: [{
                                        data: [65, 35],
                                        backgroundColor: [
                                            'rgba(54, 162, 235, 0.6)',
                                            'rgba(255, 99, 132, 0.6)',
                                        ]
                                    }]
                                }}/>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{mb: 2}}>Regional Data</Typography>
                            <Box sx={{flexGrow: 1}}>
                                <Chart type="radar" data={{
                                    labels: ['North', 'East', 'South', 'West', 'Central'],
                                    datasets: [{
                                        label: 'Sales',
                                        data: [65, 59, 90, 81, 56],
                                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                        borderColor: 'rgba(54, 162, 235, 1)',
                                        borderWidth: 1
                                    }]
                                }}/>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;