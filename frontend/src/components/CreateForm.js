import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import axios from "axios";


const CreateForm = () => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [showInputTypes, setShowInputTypes] = useState(false);
  const [formInputs, setFormInputs] = useState([]);
  const [selectedInputType, setSelectedInputType] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [editingInputIndex, setEditingInputIndex] = useState(null);
  const [creatingInput, setCreatingInput] = useState(false);
  const [editingFormTitle, setEditingFormTitle] = useState(false);

  const handleTitleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setFormTitle(event.target.value);
  };

  const handleEditFormTitle = () => {
    setEditingFormTitle(true);
  };

  const handleFormTitleBlur = () => {
    setEditingFormTitle(false);
  };

  const handleInputTypes = (type) => {
    setShowInputTypes(true);
    setSelectedInputType(type);
    setInputTitle("");
    setInputPlaceholder("");
  };

  const handleAddInput = () => {
    if (creatingInput) {
      handleSaveEditedInput();
      setCreatingInput(false);
    } else {
      const newInput = {
        type: selectedInputType,
        title: inputTitle,
        placeholder: inputPlaceholder,
      };
      setFormInputs([...formInputs, newInput]);
      setShowInputTypes(false);
      setSelectedInputType("");
    }
  };

  const handleDeleteInput = (index) => {
    const updatedInputs = [...formInputs];
    updatedInputs.splice(index, 1);
    setFormInputs(updatedInputs);
  };

  const handleEditInput = (index) => {
    setEditingInputIndex(index);
    setInputTitle(formInputs[index].title);
    setInputPlaceholder(formInputs[index].placeholder);
    setCreatingInput(true);
  };

  const handleSaveEditedInput = (index) => {
    if (index !== null) {
      const updatedInputs = [...formInputs];
      updatedInputs[index].title = inputTitle;
      updatedInputs[index].placeholder = inputPlaceholder;
      setFormInputs(updatedInputs);
      setEditingInputIndex(null);
      setInputTitle("");
      setInputPlaceholder("");
    }
  };

  const handleCancelEdit = () => {
    setEditingInputIndex(null);
    setInputTitle("");
    setInputPlaceholder("");
    setCreatingInput(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        title: formTitle,
        inputs: formInputs,
      };

      const response = await axios.post(
        "http://localhost:8080/create",
        formData
      );

      if (response.data.success) {
        alert("Input field created successfully");
        setFormTitle(formData.title);
        setFormInputs(formData.inputs);
      } else {
        console.error("Error creating inputs while creating form:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while creating the form:", error);
    }
  };

  const renderDynamicInputs = () => {
    return (
      <Grid container spacing={2}>
        {formInputs.map((input, index) => (
          <Grid item key={index} xs={6}>
            {editingInputIndex === index ? (
              <>
                <TextField
                  fullWidth
                  label="Edit Title"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  label="Edit Placeholder"
                  value={inputPlaceholder}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveEditedInput(index)}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label={input.title}
                  placeholder={input.placeholder}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FaPencilAlt onClick={() => handleEditInput(index)} />
                <FaTrash onClick={() => handleDeleteInput(index)} />
              </>
            )}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" className="create">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              {editingFormTitle ? (
                <TextField
                  type="text"
                  placeholder="Edit Form Title"
                  value={formTitle}
                  onChange={handleTitleChange}
                  onBlur={handleFormTitleBlur}
                  autoFocus
                  fullWidth
                />
              ) : (
                <>
                  <Typography variant="h4" onClick={handleTitleClick}>
                    {formTitle}
                    <FaPencilAlt
                      onClick={handleEditFormTitle}
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                    />
                  </Typography>
                </>
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowInputTypes(!showInputTypes)}
            >
              {showInputTypes ? "Close Add Input" : "Add Input"}
            </Button>
            {showInputTypes && (
              <div className="input-types-section">
                {["Email", "Text", "Password", "Number", "Date"].map((type) => (
                  <Button
                    key={type}
                    className="button-types"
                    onClick={() => handleInputTypes(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Form Editor
            </Typography>

            {selectedInputType && (
              <Typography variant="h6">{selectedInputType}</Typography>
            )}
            {showInputTypes && selectedInputType && (
              <div className="form-inputs">
                <TextField
                  type="text"
                  placeholder="Title"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  fullWidth
                />
                <TextField
                  type="text"
                  placeholder="Placeholder"
                  value={inputPlaceholder}
                  onChange={(e) => setInputPlaceholder(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddInput}
                >
                  Save
                </Button>
              </div>
            )}

            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginBottom: "16px" }}
              >
                Form Inputs:
              </Typography>
              {renderDynamicInputs()}
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateForm;
