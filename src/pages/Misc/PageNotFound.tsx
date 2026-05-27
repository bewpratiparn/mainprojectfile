import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTypography from '../../components/typography/CustomTypography';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      bgcolor="background.default"
    >
      <CustomTypography value="404" gold sx={{ fontSize: '6rem', mb: 2 }} />
      <CustomTypography value="Page Not Found" sx={{ fontSize: '2rem', mb: 4 }} />
      <Button 
        variant="contained" 
        sx={{ bgcolor: '#ff9800', '&:hover': { bgcolor: '#e68a00' } }}
        onClick={() => navigate('/Home')}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default PageNotFound;
