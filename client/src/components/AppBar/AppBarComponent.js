import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode";

import { removeUser } from "../../actions/auth";
import memories from "../../images/memories.png";
import useStyles from "./styles";

const AppBarComponent = () => {
  const classes = useStyles();
  const { user, token } = useSelector((state) => state.authData)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUser())

  }

  useEffect(() => {//need to solve
    if (token) {
      let decode = jwt_decode(token)
      console.log(decode)
      if (decode.exp * 1000 < new Date().getTime()) logout()
    }
  }, [token]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Typography variant="h2" component={Link} to='/' className={classes.heading}>
            Memories
          </Typography>
          <img src={memories} alt="memories" height={60} />
        </div>
        <div className={classes.profile}>
          {user ? (
            <>
              <Avatar size='small'>{user.name?.charAt(0) || user.email.charAt(0)}</Avatar>
              <Typography className={classes.name}>{user.name || user.email}</Typography>
              <Button variant='contained' color='secondary' onClick={logout}>Log Out</Button>
            </>

          ) : (
            <Button variant='contained' color='primary' component={Link} to="/auth" >Sign In</Button>
          )}

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
