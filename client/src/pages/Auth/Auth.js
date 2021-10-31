import {
    Avatar,
    Button,
    Container,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { saveUser, signIn, signUp } from "../../actions/auth";
import { AuthForm } from "../../components/Form";

const Auth = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authData);

    const history = useHistory();
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
            ? data.password === data.repeatPassword
                ? dispatch(signUp(data))
                : console.log(`passwords not match`)
            : dispatch(signIn(data));
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper} raised elevation={6}>
                <Avatar className={classes.icon}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                    {isSignUp ? "Sign up" : "Sign in"}
                </Typography>
                <AuthForm
                    isSignUp={isSignUp}
                    googleSuccess={googleSuccess}
                    googleFailure={googleFailure}
                    showPassword={showPassword}
                    onSubmit={onSubmit}
                    handleShowPassword={handleShowPassword}
                />
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
