import {
    Avatar,
    Button,
    Container,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LockIcon from "@material-ui/icons/Lock";

import useStyles from "./styles";
import { AuthForm } from "../../components/Form";

const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const switchSignup = (e) => {
        // console.log('click')
        //  e.preventDefault()
        e.stopPropagation()
        setIsSignUp((signup) => !signup);
        setShowPassword(false);

    };

    const handleShowPassword = () => {
        setShowPassword((password) => !password);
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.icon}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                    {isSignUp ? "Sign up" : "Sign in"}
                </Typography>
                <AuthForm
                    isSignUp={isSignUp}
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={(e) => switchSignup(e)}>
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
