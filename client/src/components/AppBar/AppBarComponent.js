import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { removeUser } from "../../actions/auth";
import memories from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useStyles from "./styles";

const AppBarComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  const { user, token } = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());
  };

  useEffect(() => {
    if (token) {
      let decode = jwt_decode(token);
      if (decode.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location, token]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Link to="/">
            <img
              src={memoriesText}
              alt="memoriesText"
              height={45}
              className={classes.heading}
            />
            <img src={memories} alt="memories" height={40} />
          </Link>
        </div>
        <div className={classes.profile}>
          {user ? (
            <>
              <Avatar size="small" className={classes.userAvater}>
                {user.name?.charAt(0) || user.email.charAt(0)}
              </Avatar>
              <Typography className={classes.name}>
                {user.name || user.email}
              </Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Log Out
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/auth"
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
