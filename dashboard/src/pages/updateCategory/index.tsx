import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Link, Box, ThemeProvider, Container, createTheme, Avatar, CssBaseline, Switch, styled } from '@mui/material';
import { Field, Formik } from 'formik';
import { UpdateCategorySchema } from './validation';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ReactNode, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";
import { getSelectedCategory } from '../../services/api-category-service';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const initialValues = { id: "", name: "", description: "" };

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  title: string,
  price: string,
  description: string,
  categoryName: string,
  action: string,
) {
  return { title };
}


const UpdateCourse: React.FC = () => {
  
  
  const selectedCategory = getSelectedCategory();
  const navigate = useNavigate();
  const {DeleteCategory, UpdateCategory, DeleteCourse} = useActions();
  const { allCategories } = useTypedSelector((state) => state.CategoryReducer);
  const { allCourses } = useTypedSelector((state) => state.CourseReducer);

  const { message } = useTypedSelector((store) => store.CourseReducer);
  const { GetAllCourses } = useActions();

  useEffect(() => {
    GetAllCourses();
  }, []);


  if (message === "A category was successfully deleted") {
    return <Navigate to="/dashboard/categories" />;
  }

  if(message === "A course was deleted")
  {
    window.location.reload();
  }

  if(selectedCategory == null)
  {
    navigate("/dashboard/categories");
  }
  const updateCategory = JSON.parse(selectedCategory);
  console.log("updateCategory: ", updateCategory);

  var found = allCourses.find((c: { categoryName: string; }) => c.categoryName == updateCategory.name);
  console.log("found ", found);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = {
      Id: data.get("id"),
      Name: data.get("name"),
      Description: data.get("description"),
    };
    UpdateCategory(model);
    navigate("/dashboard/categories");
    window.location.reload();
  };
  

  let flag = true;

  const dangerZoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("all courses ", allCourses);

  
      allCourses.forEach((course: { categoryId: any; }) => {
        if(flag==true)
        {
          if(course.categoryId == updateCategory.id)
          {
            toast.error("You cannot delete this category because it has courses in it!");
            flag = false;
          }
        }
      });
    if(flag)
    {
      DeleteCategory(updateCategory.id);
    }

    //navigate("/dashboard/categories");
    //window.location.reload();
  };


  const OnEditClick = (event: React.MouseEvent<unknown>, row: any) => {
    event.preventDefault();
    if(window.confirm("Are you sure?"))
    {
      window.localStorage.setItem("selectedCourse", JSON.stringify(row));
      navigate("/dashboard/courses/update");
    }
  };
 
  initialValues.id = updateCategory.id;
  initialValues.name = updateCategory.name;
  initialValues.description = updateCategory.description;
   
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
          validationSchema={UpdateCategorySchema}
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
                        Update category
                    </Typography>
                  <Grid sx={{width:"100%"}}>
                  <Field
                      margin="normal"
                      id="id"
                      name="id"
                      type="hidden"
                      value={updateCategory.id}
                    />
                  </Grid>
                  <Grid sx={{width:"60%"}}>
                  <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Name"
                      name="name"
                      type="text"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red", width:"45%", float:"left" }}>{errors.name}</div>
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
                  Delete a category?
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
      
      {/* {allCourses.find((c: { categoryName: string; }) => c.categoryName == updateCategory.name) != null && (
        <TableContainer component={Paper} sx={{mt:3}}>
        <Table sx={{ minWidth: 700}} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
         
            {allCourses.map((row: {
              categoryName: ReactNode;
              description: ReactNode;price: ReactNode; title: React.Key | null | undefined; 
  }) => {
  
    if(row.categoryName === updateCategory.name) 
      return(
      <StyledTableRow
          key={row.title}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <StyledTableCell component="th" scope="row">
            {row.title}
          </StyledTableCell>
          <StyledTableCell align="right">{row.price}</StyledTableCell>
          <StyledTableCell align="right">{row.description}</StyledTableCell>
          <StyledTableCell align="right">
              <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ width:"45%", my:4}}
                  onClick={(event) => OnEditClick(event, row)}
                >
                  Edit
            </Button>
            </StyledTableCell>
        </StyledTableRow>
      
      )}
      
      )}
      </TableBody>
      </Table>
      </TableContainer>
      )} */}
        

  </ThemeProvider>
);
};

export default UpdateCourse;