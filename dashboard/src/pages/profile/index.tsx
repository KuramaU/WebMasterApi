import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Link, Box, ThemeProvider, Container, createTheme, Avatar, CssBaseline, Switch } from '@mui/material';
import { Field, Formik } from 'formik';
import { UpdateProfileSchema, UpdatePasswordSchema } from './validation';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getSelectedUser, Logout } from '../../services/api-user-service';
import { useNavigate } from "react-router-dom";

const initialValues = { id: "", firstName: "", lastName: "", email: "", phoneNumber: "", currentPassword: "", newPassword: "", confirmNewPassword: "" };

const theme = createTheme();


const Profile: React.FC = () => {
  
  
  const selectedUser = getSelectedUser();
  const navigate = useNavigate();
  const {UpdateProfile, BlockUnblock} = useActions();
  const { user } = useTypedSelector((state) => state.UserReducer);
  const {DeleteUser, LogOut, ResetPassword} = useActions();

  if(selectedUser == null)
  {
    navigate("/dashboard/users");
  }
  const updateUser = JSON.parse(selectedUser);
  console.log("updateUser: ", updateUser);
  console.log("user: ", user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = {
      Id: data.get("id"),
      Name: data.get("firstName"),
      Surname: data.get("lastName"),
      Email: data.get("email"),
      PhoneNumber: data.get("phoneNumber"),
    };
    UpdateProfile(model);
     if(updateUser.id === user.Id)
    {
      LogOut(updateUser.id);
      navigate("/dashboard/users");
    }
    else {navigate("/")}
  };
  

  const dangerZoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(user.Id != updateUser.id)
    {
        DeleteUser(updateUser.id);
        navigate("/dashboard/users");
    }
    else
    {
        toast.error('You cannot delete yourself!', {position: toast.POSITION.TOP_RIGHT});
    }
  };
  const updatePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatePasswordData = {
        Email: updateUser.email,
        CurrentPassword: data.get("currentPassword"),
        NewPassword: data.get("newPassword"),
        ConfirmNewPassword: data.get("confirmNewPassword"),
    }
    ResetPassword(updatePasswordData);
    if(updateUser.id === user.Id)
    {
      LogOut(updateUser.id);
      navigate("/");
    }
    navigate("/dashboard/users");
  };
    initialValues.id = updateUser.id;
   initialValues.firstName = updateUser.name;
   initialValues.lastName = updateUser.surname;
   initialValues.email = updateUser.email;
   initialValues.phoneNumber = updateUser.phoneNumber;
   
   const onBlockClick = (event: React.MouseEvent<unknown>, userId: string) =>
   {
        console.log("User id: ", userId);
        BlockUnblock(userId);
   }

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
              validationSchema={UpdateProfileSchema}
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
                        Update profile
                    </Typography>
                  <Grid sx={{width:"100%"}}>
                  <Field
                      margin="normal"
                      id="id"
                      name="id"
                      type="hidden"
                      value={updateUser.id}
                    />
                  </Grid>
                  <Grid sx={{width:"60%"}}>
                  <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="First name"
                      name="firstName"
                      type="text"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red", width:"45%", float:"left" }}>{errors.firstName}</div>
                    ) : null}
                  </Grid> 
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      name="lastName"
                      label="Last name"
                      type="text"
                    />
                      {errors.lastName && touched.lastName ? (
                        <div style={{ color: "red" }}>{errors.lastName}</div>
                      ) : null}
                    </Grid>
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Email address"
                      name="email"
                      type="text"
                    />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                  </Grid>
    
                  <Grid sx={{width:"60%"}}>
                    <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Phone number"
                      name="phoneNumber"
                      type="text"
                    />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                      ) : null}
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
              background: "white",
              border: "2px white solid",
              borderRadius: "15px",
            }}>
            <Formik
              initialValues={initialValues}
              validationSchema={UpdatePasswordSchema}
              onSubmit={() => {}}>
              {({ errors, touched, isSubmitting, isValid, dirty }) => (
                <Box
                  component="form"
                  onSubmit={updatePasswordSubmit}
                  noValidate
                  sx={{m:"auto", width: "95%", mb:2}}
                >
                

                <Grid
                  sx={{padding:0, display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center" }}>
                    <Typography component="h1" variant="h5" sx={{mt:2, fontWeight: "500"}}>
                        Update password
                    </Typography>
                  <Grid sx={{width:"100%"}}>
                  <Field
                      margin="normal"
                      id="id"
                      name="id"
                      type="hidden"
                      value={updateUser.id}
                    />
                  </Grid>
                  <Grid sx={{width:"50%"}}>
                  <Field
                      as={TextField}
                      margin="normal"
                      fullWidth
                      label="Current password"
                      name="currentPassword"
                      type="password"
                    />
                    {errors.currentPassword && touched.currentPassword ? (
                      <div style={{ color: "red", width:"45%", float:"left" }}>{errors.currentPassword}</div>
                    ) : null}
                  </Grid> 
                  <Grid sx={{width:"50%"}}>
                    <Field
                     as={TextField}
                     margin="normal"
                     fullWidth
                     label="New password"
                     name="newPassword"
                     type="password"/>
                    
                      {errors.newPassword && touched.newPassword ? (
                        <div style={{ color: "red" }}>{errors.newPassword}</div>
                      ) : null}
                    </Grid>
                    <Grid sx={{width:"50%"}}>
                    <Field
                     as={TextField}
                     margin="normal"
                     fullWidth
                     label="Confirm new password"
                     name="confirmNewPassword"
                     type="password"/>
                    
                      {errors.confirmNewPassword && touched.confirmNewPassword ? (
                        <div style={{ color: "red" }}>{errors.confirmNewPassword}</div>
                      ) : null}
                    </Grid>
                  <Grid sx={{width: "40%"}}>
                    <Button
                      disabled={!(isValid && dirty)}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ my:4}}
                    >
                      {isSubmitting ? "Loading" : "Update"}
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
                {user.role === "Administrators" && (
                <Typography component="h1" variant="h5" sx={{my:3, color:"#DC1A7E", fontWeight: "500"}}>
                  Do you want to block or delete account?
                </Typography>
              )}
                {updateUser.isBlocked === false && 
                    <Button
                        onClick={(event)=>onBlockClick(event, updateUser.id)}
                        fullWidth
                        variant="contained"
                        color="warning"
                        sx={{ width:"45%"}}
                    >
                      Block
                </Button>}
                {updateUser.isBlocked === true && <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="warning"
                      sx={{ width:"45%"}}
                    >
                      Unblock
                </Button> }
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
export default Profile;