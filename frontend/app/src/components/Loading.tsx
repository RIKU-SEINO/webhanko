import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  width: number | null;
  height: number | null;
}

const Loading: React.FC<LoadingProps> = ({ width, height }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
