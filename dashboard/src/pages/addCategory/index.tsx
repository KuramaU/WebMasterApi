import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { AddCategorySchema } from "./validation";
import { useNavigate } from "react-router-dom";

const AddCategory: React.FC = () => {
  
  const { message } = useTypedSelector((store) => store.CategoryReducer);
  
  const { CreateCategory } = useActions();
  const navigate = useNavigate();
  
  if (message === "A category was successfully created") {
    return <Navigate to="/dashboard/categories" />;
  }
  const initialValues = {
    name: "",
    description: "",
  };
  const theme = createTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newCategory = {
      Name: data.get("name"),
      Description: data.get("description"),
    };

    CreateCategory(newCategory);
    // navigate("/dashboard/categories");
    // window.location.reload();
  };

  return (
    <>
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{background: "white"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create a category
          </Typography>
        <Container maxWidth="sm">
          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={AddCategorySchema}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                sx={{ my: 1 }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
              >
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="name"
                  variant="outlined"
                  />
                  {errors.name && touched.name ? (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  variant="outlined"
                  />
                  
                <Box sx={{ py: 2 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Add"}
                  </Button>
                  
                </Box>
              </Box>
            )}
          </Formik>
          </Container>
      </Box>
     </Container>
    </ThemeProvider>
    </>
  );
};
export default AddCategory;