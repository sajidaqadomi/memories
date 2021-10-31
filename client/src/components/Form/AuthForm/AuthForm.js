import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button, Grid, IconButton, InputAdornment } from "@material-ui/core";

import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { GoogleIcon } from "../..";
import useStyles from "./styles";

const AuthForm = ({
  isSignUp,
  googleSuccess,
  googleFailure,
  onSubmit,
  handleShowPassword,
  showPassword,
}) => {
  const methods = useForm();
  const classes = useStyles();
  return (
    <FormProvider {...methods}>
      <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {isSignUp && (
            <>
              <Grid item md={6} xs={12}>
                <FormInput name="firstName" label="First Name" />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormInput name="lastName" label="Last Name" />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormInput name="emailAddress" label="Email Adress" type="email" />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {isSignUp && (
            <Grid item xs={12}>
              <FormInput
                name="repeatPassword"
                label="Repeat Password"
                type="password"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormButton>{isSignUp ? "Sign Up" : "Sign In"}</FormButton>
          </Grid>
          <Grid item xs={12}>
            <GoogleLogin
              clientId="649631613069-h47v4uemg1okcunqgpff5fnsn9fae0uj.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon />}
                >
                  Google Sign In
                </Button>
              )}
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
