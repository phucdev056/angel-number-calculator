import React, { useState } from "react";
import { Container, Grid, TextField, Box, Button, Typography } from '@mui/material';

const NameCalculator = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: ''
  });

  const [errors, setErrors] = useState({
    firstname: '',
    middlename: '',
    lastname: ''
  });  

  const handleValidate = (value, fieldName, required) => {
    if (required) {
      if(!value) {
        setErrors((errors) => ({ ...errors, [fieldName]: `Please choose the ${fieldName}`}));
        return false;
      } else {
        setErrors((errors) => ({ ...errors, [fieldName]: "" }));
        return true;
      }
    } else {
      return true;
    }
  };

  const handleChange = (event, fieldName, required) => {
    handleValidate(event.target.value, fieldName, required);
    setFormData((formData) => { return { ...formData, [fieldName]: event.target.value }});
  };

  const handleCalculate = (value) => {
    
  };

  const handleSubmit = () => {
    const validationResult = Object.keys(formData).map((key) => {
      return handleValidate(formData[key], key, key !== 'middlename' ? true : false);
    });

    const isInvalid = validationResult.filter((r) => !r).length > 0;

    console.log('isInvalid', isInvalid);

    if (isInvalid) {
      return;
    }

    console.log('formData', formData);

    const result = Object.keys(formData).map((key) => {    
      return handleCalculate(formData[key]);
    });
  };

  return (
    <Container sx={{ marginY: 10 }}>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        Your Name
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            id="firstname"
            label="Firstname"
            variant="outlined"
            value={formData.firstname}
            fullWidth
            required
            onChange={(event) => handleChange(event, 'firstname', true)}
            error={errors.firstname !== ""}
            helperText={errors.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="middlename"
            label="Middlename"
            variant="outlined"
            value={formData.middlename}
            fullWidth
            required
            onChange={(event) => handleChange(event, 'middlename', false)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            id="lastname"
            label="Lastname"
            variant="outlined"
            value={formData.lastname}
            fullWidth
            required
            onChange={(event) => handleChange(event, 'lastname', true)}
            error={errors.lastname !== ""}
            helperText={errors.lastname}
          />          
        </Grid>    
      </Grid>
      <Box>
        <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
      </Box>      
    </Container>
  );
};

export default NameCalculator;
