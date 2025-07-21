import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
    <CircularProgress size={40} />
    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
      {text}
    </Typography>
  </Box>
);

export default LoadingSpinner;
