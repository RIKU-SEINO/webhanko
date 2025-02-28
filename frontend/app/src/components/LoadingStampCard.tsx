import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingStampCard: React.FC = () => {
  return (
    <Box
      sx={{
        width: 200,
        height: 348,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingStampCard;
