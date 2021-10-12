import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

import memories from "../../images/memories.png";
import useStyles from "./styles";

const AppBarComponent = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h2" component="h1" className={classes.heading}>
          Memories
        </Typography>
        <img src={memories} alt="memories" height={60} />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
