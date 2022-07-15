import React, { useState } from "react";
import { Container, Grid, TextField, Box, Button } from '@mui/material';

const NameCalculator = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: ''
  });

  const handleCalculate = () => {
    console.log('formData', formData);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField id="firstname" label="Firstname" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={4}>
          <TextField id="middlename" label="Middlename" variant="outlined" fullWidth/>
        </Grid>
        <Grid item xs={4}>
          <TextField id="lastname" label="Lastname" variant="outlined" fullWidth required />
        </Grid>    
      </Grid>
      <Box>
        <Button variant="contained" onClick={() => handleCalculate()}>Submit</Button>
      </Box>      
    </Container>
  );
};

export default NameCalculator;
