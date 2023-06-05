import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Link, Box, ThemeProvider, Container, createTheme, Avatar, CssBaseline, Switch, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Field, Formik } from 'formik';
import { UpdateCourseSchema } from './validation';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getSelectedCourse } from '../../services/api-course-service';
import { CategoryState } from '../../store/reducers/categoryReducer/types';

const initialValues = { id: "", title: "", description: "", price: "", categoryId: "" };

const theme = createTheme();

const UpdateCourse: React.FC = () => {
  
  
  const {DeleteCourse, UpdateCourse} = useActions();
  const { GetAllCategories } = useActions();

  const { allCategories } = useTypedSelector((state: { CategoryReducer: CategoryState; }) => state.CategoryReducer);

  const navigate = useNavigate();
  const selectedCourse = getSelectedCourse();

  const updateCourse = JSON.parse(selectedCourse);
  
  if(selectedCourse == null)
  {
    navigate("/dashboard/courses");
  }
  const categoryId = updateCourse.categoryId.toString();

  useEffect(() => {
    GetAllCategories();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    initialValues.categoryId = event.target.value;
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = {
      Id: data.get("id"),
      Title: data.get("title"),
      Description: data.get("description"),
      Price: data.get("price"),
      CategoryId: data.get("categoryId"),
    };
    UpdateCourse(model);
    navigate("/dashboard/courses");
    window.location.reload();
  };
  

  const dangerZoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    DeleteCourse(updateCourse.id);
    navigate("/dashboard/courses");
    window.location.reload();
  };
 
  initialValues.id = updateCourse.id;
  initialValues.title = updateCourse.title;
  initialValues.description = updateCourse.description;
  initialValues.price = updateCourse.price;
  initialValues.categoryId = updateCourse.categoryId;
   
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <CssBaseline />
        <Box
          sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          border: "2px white solid",
          borderRadius: "15px",
        }}>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateCourseSchema}
          onSubmit={() => {}}>
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{m:"auto", width: "95%", mb:2}}
            >
                
                <Grid
                  sx={{padding:0, display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center" }}>
                    <Typography component="h1" variant="h5" sx={{mt:2, fontWeight: "500"}}>
                        Update a course
                    </Typography>
                  <Grid sx={{width:"100%"}}>
                  <Field
                      margin="normal"
                      id="id"
                      name="id"
                      type="hidden"
                      value={updateCourse.id}
                    />
                  </Grid>
                  <Grid sx={{width:"60%"}}>
                  <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Title"
                      name="title"
                      type="text"
                    />
                    {errors.title && touched.title ? (
                      <div style={{ color: "red", width:"45%", float:"left" }}>{errors.title}</div>
                    ) : null}
                  </Grid> 
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="description"
                      label="Description"
                      type="text"
                    />
                      {errors.description && touched.description ? (
                        <div style={{ color: "red" }}>{errors.description}</div>
                      ) : null}
                    </Grid>
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Price"
                      name="price"
                      type="text"
                    />
                      {errors.price && touched.price ? (
                        <div style={{ color: "red" }}>{errors.price}</div>
                      ) : null}
                  </Grid>
    
                  <Grid sx={{width:"60%"}}>
                   
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
                    {errors.categoryId && touched.categoryId ? (
                        <div style={{ color: "red" }}>{errors.categoryId}</div>
                      ) : null}
                  </FormControl>
                  </Grid>
                  <Grid sx={{width: "45%"}}>
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ my:4}}
                    >
                      {isSubmitting ? "Loading" : "Edit"}
                    </Button>
                  </Grid>
                </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>

        <Container maxWidth={false}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "#ffffff 3px solid",
              background: "white", 
              borderRadius: "15px"
            }}>
              <Formik
              initialValues={initialValues}
              onSubmit={() => {}}>
                <Box
                  component="form"
                  onSubmit={dangerZoneSubmit}
                  noValidate
                  sx={{m:"auto", width: "95%", mb:2}}
                >
                
                <Grid
                    sx={{display:"flex", justifyContent:"space-around", flexDirection:"column", alignItems:"center" }}
                >
                
                <Typography component="h1" variant="h5" sx={{my:3, color:"#DC1A7E", fontWeight: "500"}}>
                  Delete a course?
                </Typography>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="error"
                      sx={{ width:"45%", my:4}}
                    >
                      Delete
                </Button>
                </Grid> 
                </Box>
              </Formik>
          </Box>
        </Container>                 
      </ThemeProvider>
    );
  return <></>
}
export default UpdateCourse;