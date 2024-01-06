import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Typography, Container, Grid, Button } from '@mui/material';


const FormDetails = () => {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [userInput, setUserInput] = useState({});

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/${id}`);
        if (response.data) {
          setFormDetails(response.data);
          
          const initialUserInput = response.data.inputs.reduce(
            (acc, input) => ({ ...acc, [input.title]: '' }),
            {}
          );
          setUserInput(initialUserInput);
        } else {
          console.error('Error fetching form details:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [id]);

  const handleInputChange = (title, value) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [title]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h6" gutterBottom>
        Form Title: {formDetails?.title}
      </Typography>
      <Grid container spacing={2}>
        {formDetails?.inputs.map((input, index) => (
          <Grid item xs={6} key={index}>
            <TextField
              label={input.title}
              type={input.type.toLowerCase()}
              fullWidth
              variant="outlined"
              value={userInput[input.title] || ''}
              onChange={(e) => handleInputChange(input.title, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={() => alert("form submitted successfully")}>
        Submit
      </Button>
    </Container>
  );
};

export default FormDetails;
