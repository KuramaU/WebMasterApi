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
import { AddCourseSchema } from "./validation";
import { useNavigate } from "react-router-dom";

const AddCourse: React.FC = () => {
  
  const [color, setColor] = useState('cute');
  const { message } = useTypedSelector((store) => store.CourseReducer);
  const { allCategories } = useTypedSelector((state) => state.CategoryReducer);
  
  const { CreateCourse } = useActions();
  const { GetAllCategories } = useActions();
  const navigate = useNavigate();
  
  const categoryId = 1;

  useEffect(() => {
    GetAllCategories();
  }, []);
  
  if (message === "A course was successfully created") {
    return <Navigate to="/dashboard/courses" />;
  }
  const initialValues = {
    title: "",
    description: "",
    price: "",
    categoryId: "",
    categoryName: "",
  };
  const theme = createTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newCourse = {
      Title: data.get("title"),
      Description: data.get("description"),
      Price: data.get("price"),
      CategoryId: data.get("categoryId"),
      CategoryName: data.get("categoryName"),
    };

    CreateCourse(newCourse);
    // navigate("/dashboard/courses");
    // window.location.reload();
  };

  const handleChange = (event: SelectChangeEvent) => {
    initialValues.categoryId = event.target.value;
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
          <Typography component="h1" variant="h5" sx={{mt:2}}>
            Create a course
          </Typography>
        <Container maxWidth="sm">
          <Formik
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={AddCourseSchema}
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
                  label="Title"
                  margin="normal"
                  name="title"
                  variant="outlined"
                  />
                  {errors.title && touched.title ? (
                    <div style={{ color: "red" }}>{errors.title}</div>
                  ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  variant="outlined"
                  />
                  {errors.description && touched.description ? (
                    <div style={{ color: "red" }}>{errors.description}</div>
                  ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Price"
                  margin="normal"
                  name="price"
                  variant="outlined"
                  sx={{mb:1}}
                  />
                  {errors.price && touched.price ? (
                    <div style={{ color: "red" }}>{errors.price}</div>
                  ) : null}

                
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{mt:2}}>Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    name="categoryId"
                    onChange={handleChange}
                    defaultValue = {categoryId.toString()}
                    sx={{my:2}}
                  >
                    {allCategories.map((category:any) => {
                      return(<MenuItem value={category.id}>{category.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>

                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                  }}
                ></Box>
                <Box sx={{ py: 3 }}>
                  <Button
                    disabled={!(isValid && dirty)}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isSubmitting ? "Loading" : "Create"}
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
export default AddCourse;