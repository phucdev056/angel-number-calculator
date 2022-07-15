import React, { useState } from "react";
import { Container, Grid, Box, Button, FormControl, Select, MenuItem, InputLabel, Typography, FormHelperText } from '@mui/material';

const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'Feburary' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];


const generateArrayOfYears = () => {
  let max = new Date().getFullYear();
  let min = max - 50;
  let years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

const BirthDayCalculator = () => {
  const [angelNumber, setAngelNumber] = useState(0);
  const [formData, setFormData] = useState({
    date: '',
    month: '',
    year: ''
  });

  const [errors, setErrors] = useState({
    date: '',
    month: '',
    year: ''
  });

  const years = generateArrayOfYears();

  const generateTotal = (value) => {
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      sum += parseInt(value[i]);
    }
    return sum;
  } 

  const handleCalculate = (value) => {
    const stringValue = value.toString();
    if (stringValue.length === 1) {
      return value;
    } else {
      const subTotal = generateTotal(stringValue);
      return handleCalculate(subTotal);
    }
  };

  const handleValidate = (value, fieldName) => {
    if(!value) {
      setErrors((errors) => ({ ...errors, [fieldName]: `Please choose the ${fieldName}`}));
      return false;
    } else {
      setErrors((errors) => ({ ...errors, [fieldName]: "" }));
      return true;
    }
  };

  const handleSubmit = () => {

    const validationResult = Object.keys(formData).map((key) => {
      return handleValidate(formData[key], key);
    });

    const isInvalid = validationResult.filter((r) => !r).length > 0;

    if (isInvalid) {
      return;
    }

    const result = Object.keys(formData).map((key) => {    
      return handleCalculate(formData[key]);
    });

    const resultSumUp = result.reduce((partialSum, a) => partialSum + a, 0);
    const finalResult = handleCalculate(resultSumUp);
    setAngelNumber(finalResult);
  }; 

  const handleChange = (event, fieldName) => {
    setAngelNumber(0);
    handleValidate(event.target.value, fieldName);
    setFormData((formData) => { return { ...formData, [fieldName]: event.target.value }});
  };

  return (
    <Container sx={{ marginY: 10 }}>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        Date of Birth
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={4}>
          <FormControl fullWidth error={errors.date !== ""}>
            <InputLabel id="dates-select-label">Date</InputLabel>
            <Select
              labelId="dates-select-label"
              id="dates-select"
              value={formData.date}
              label="Date"
              onChange={(event) => handleChange(event, 'date')}              
            >
              {dates.map((day) => (
                <MenuItem value={day} key={day}>{day}</MenuItem>
              ))}              
            </Select>
            <FormHelperText>{errors.date}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth error={errors.month !== ""}>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={formData.month}
              label="Month"
              onChange={(event) => handleChange(event, 'month')}
            >
              {months.map((month) => (
                <MenuItem value={month.value} key={month.value}>{month.label}</MenuItem>
              ))}              
            </Select>
            <FormHelperText>{errors.month}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth error={errors.year !== ""}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={formData.year}
              label="Year"
              onChange={(event) => handleChange(event, 'year')}
            >
              {years.map((year) => (
                <MenuItem value={year} key={year}>{year}</MenuItem>
              ))}              
            </Select>
            <FormHelperText>{errors.year}</FormHelperText>
          </FormControl>
        </Grid>    
      </Grid>
      <Box>
        <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
      </Box>
      {angelNumber > 0 && (
        <Typography variant="h1" component="div" sx={{ marginY: 2 }}>
          {angelNumber}
        </Typography>
      )}      
    </Container>
  );
};

export default BirthDayCalculator;
