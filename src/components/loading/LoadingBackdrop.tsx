import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingBackdrop = ({ open = true }) => {
  return (
    <Backdrop
      sx={{ color: '#ff9800', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
