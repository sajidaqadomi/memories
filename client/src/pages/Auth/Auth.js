import {
    Avatar,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import LockIcon from "@material-ui/icons/Lock";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import FormInput from "../../components/Form/FormInput";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, signIn, signUp } from "../../actions/auth";
import { GoogleIcon } from "../../components";

const Auth = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authData);
    const history = useHistory();
    const methods = useForm();
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (token) history.push("/");
    }, [token, history]);

    const switchSignup = () => {
        setIsSignUp((signup) => !signup);
        setShowPassword(false);
    };

    const handleShowPassword = () => {
        setShowPassword((password) => !password);
    };

    const googleSuccess = async (res) => {
        try {
            const { tokenId, profileObj } = await res;

            dispatch(saveUser({ token: tokenId, user: profileObj }));
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (err) => {
        console.log("Google Sign In was unseccessful.Try Again Later", err);
    };

    const onSubmit = (data) => {
        isSignUp
            ? (data.password === data.repeatPassword
                ? dispatch(signUp(data))
                : console.log(`passwords not match`))
            : dispatch(signIn(data));
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.icon}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                    {isSignUp ? "Sign up" : "Sign in"}
                </Typography>
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
                                    name="emailAddress"
                                    label="Email Adress"
                                    type="email"
                                />
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
                                <Button
                                    className={classes.submit}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    {isSignUp ? "Sign Up" : "Sign In"}
                                </Button>
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={switchSignup}>
                        {isSignUp
                            ? "Already have an account? Sign in"
                            : "Don't have an account? Sign Up"}
                    </Button>
                </div>
            </Paper>
        </Container>
    );
};

export default Auth;
