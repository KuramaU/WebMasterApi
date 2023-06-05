import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Field, Formik } from "formik";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ResetPasswordSchema } from "./validation";
import { useActions } from "../../hooks/useActions";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialValues = { currentPassword: "", newPassword: "", confirmNewPassword: ""};

const theme = createTheme();

export default function ResetPassword() {
  const { message, isAuth } = useTypedSelector((store) => store.UserReducer);
  const { ResetPassword } = useActions();
  const userEmail = window.localStorage.getItem("userEmail");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = {
        Email: userEmail,
        CurrentPassword: data.get("currentPassword"),
        NewPassword: data.get("newPassword"),
        ConfirmNewPassword: data.get("confirmNewPassword"),
      };
      console.log(model);
    ResetPassword(model);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={ResetPasswordSchema}
            onSubmit={() => {}}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "100%" }}
              >
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="currentPassword"
                  label="Current paswword"
                  name="currentPassword"
                />
                {errors.currentPassword && touched.currentPassword ? (
                  <div style={{ color: "red" }}>{errors.currentPassword}</div>
                ) : null}
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="newPassword"
                  label="New password"
                  name="newPassword"
                />
                {errors.newPassword && touched.newPassword ? (
                  <div style={{ color: "red" }}>{errors.newPassword}</div>
                ) : null}

                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="confirmNewPassword"
                  label="Confirm new password"
                  name="confirmNewPassword"
                />
                {errors.confirmNewPassword && touched.confirmNewPassword ? (
                  <div style={{ color: "red" }}>{errors.confirmNewPassword}</div>
                ) : null}
                <Button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Loading" : "Reset"}
                </Button>
               
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}