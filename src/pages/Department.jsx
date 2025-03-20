// src/pages/Department.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Department = () => {
  const { name } = useParams();
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ color: '#8A2BE2', mt: 4 }}>
        {name}
      </Typography>
      <Typography>Details about the {name} department.</Typography>
    </Container>
  );
};

export default Department;

