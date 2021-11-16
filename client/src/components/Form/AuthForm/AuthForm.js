//i have issue with mode on touch and click
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import FormInput from "../FormInput";
import FormButton from "../FormButton";
import { GoogleIcon, Toast } from "../..";
import useStyles from "./styles";
import { findEmail } from "../../../api";
import { signIn, signUp, saveUser } from "../../../actions/auth";
import { ERROR_AUTH } from "../../../utility/actionTypes";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    emailAddress: yup
      .string()
      .required()
      .email()
      .test("valid Email", `Email Address already exists`, async (value) => {
        if (!value) return true;
        try {
          const { data: find } = await findEmail(value);
          return !find;
        } catch (error) {
          return true;
        }
      }),
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
    signInEmailAddress: yup
      .string()
      .required()
      .email()
      .test("valid Email", `Email Address not exists`, async (value) => {
        if (!value) return false;
        try {
          const { data: find } = await findEmail(value);
          return find;
        } catch (error) {
          return false;
        }
      }),
    signInPassword: yup.string().required(),
  })
  .required();

const AuthForm = ({ isSignUp, handleShowPassword, showPassword }) => {
  const methods = useForm({
    resolver: yupResolver(isSignUp ? schema : signinSchema),
    mode: "onSubmit",
    defaultValues: isSignUp
      ? {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        repeatPassword: "",
      }
      : {
        signInEmailAddress: "",
        signInPassword: "",
      },
  });

  const classes = useStyles();
  const history = useHistory();

  const { isLoading, errorMessage, token } = useSelector(
    (state) => state.authData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    methods.reset();
    methods.clearErrors([]);
  }, [isSignUp]);

  const googleSuccess = async (res) => {
    try {
      const { tokenId, profileObj } = await res;
      dispatch(saveUser({ token: tokenId, user: profileObj }));
    } catch (error) {
      dispatch({ type: ERROR_AUTH, payload: JSON.stringify(error) }); //dispatch
    }
  };

  const googleFailure = (err) => {
    dispatch({ type: ERROR_AUTH, payload: err.error });
  };

  const onSubmit = (data) => {
    isSignUp
      ? dispatch(signUp(data))
      : dispatch(
        signIn({
          emailAddress: data.signInEmailAddress,
          password: data.signInPassword,
        })
      );
  };

  useEffect(() => {
    if (token) history.push("/");
  }, [token, history]);

  return (
    <>

      <Toast
        message={errorMessage}
        type="error"
        title="Login Failed"
        open={!!errorMessage}
        onClose={() => dispatch({ type: ERROR_AUTH, payload: null })}
      />
      <FormProvider {...methods}>
        <form
          className={classes.form}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
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
              <FormInput
                name={isSignUp ? "emailAddress" : "signInEmailAddress"}
                label="Email Adress"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name={isSignUp ? "password" : "signInPassword"}
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
              <FormButton
                disabled={isLoading}
                endIcon={
                  isLoading && (
                    <CircularProgress color="primary" disableShrink size={30} />
                  )
                }
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </FormButton>
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
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AuthForm;
