import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AppBar } from "./components";
import { getPosts } from "./actions/posts";
//import useStyles from "./styles";
import { Auth, Home } from "./pages";
import { retrieveUser } from "./actions/auth";

function App() {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(retrieveUser())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AppBar />
      </Container>
      <Switch>
        <Route exact path='/' component={() => <Home currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route exact path='/auth' component={() => <Auth />} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
