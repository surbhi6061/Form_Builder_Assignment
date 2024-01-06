import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";

const FormCard = ({ form, handleDelete }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {form.title}
        </Typography>
        <div>
          <IconButton
            component={Link}
            to={`/form/${form._id}`}
            aria-label="view"
          >
            view
          </IconButton>
          <IconButton
            component={Link}
            to={`/form/${form._id}/edit`}
            aria-label="edit"
          >
            edit
          </IconButton>
          <IconButton
            onClick={() => handleDelete(form._id)}
            aria-label="delete"
          >
            delete
          </IconButton>
        </div>
      </CardContent>
    </Card>
  </Grid>
);

const Homepage = () => {
  const [forms, setForms] = useState([]);

  const handleDelete = async (formId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/${formId}`);
      if (response.data.success) {
        const filteredForms = forms.filter((f) => f._id !== formId);
        setForms(filteredForms);
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting forms:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/");
        if (response.data.success) {
          setForms(response.data.data);
        } else {
          console.error("Error fetching forms:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" >
      <Typography variant="h4" gutterBottom>
        Welcome to Form
      </Typography>
      <Typography variant="body1" paragraph>
        Let's try creating your own dynamic form
      </Typography>
      <Link to="/form/create">
        <Button variant="contained" color="primary">
          Create Form +
        </Button>
      </Link>

      <Grid container spacing={3} >
        {forms.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No forms available.
          </Typography>
        ) : (
          forms.map((form) => (
            <FormCard key={form._id} form={form} handleDelete={handleDelete} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Homepage;
