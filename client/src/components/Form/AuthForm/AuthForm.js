import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button, Grid, IconButton, InputAdornment } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { GoogleIcon } from "../..";
import useStyles from "./styles";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    emailAddress: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),

    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords must match"),
  })
  .required();

const signinSchema = yup
  .object({
    emailAddress: yup.string().required().email(),
    password: yup
      .string()
      .required()

  })
  .required();

const AuthForm = ({
  isSignUp,
  googleSuccess,
  googleFailure,
  onSubmit,
  handleShowPassword,
  showPassword,
}) => {
  const methods = useForm({
    resolver: yupResolver(isSignUp ? schema : signinSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      repeatPassword: "",
    },
  });
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
