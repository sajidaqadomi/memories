import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { AppBar } from "./components";

import { Auth, Home, PostDetails } from "./pages";
import { retrieveUser } from "./actions/auth";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.authData)
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(retrieveUser())
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <AppBar />
      </Container>
      <Switch>
        <Route exact path='/' component={() => <Redirect to='/posts' />} />
        <Route exact path='/posts' component={() => <Home currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route exact path='/posts/search' component={() => <Home currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route exact path='/posts/:id' component={() => <PostDetails />} />
        <Route exact path='/auth' component={() => (!token ? <Auth /> : <Redirect to='/' />)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
