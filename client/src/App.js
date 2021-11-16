import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { AppBar } from "./components";
import { Auth, Home, PostDetails } from "./pages";
import { retrieveUser } from "./actions/auth";
import storage from "./auth/storage";
import ProfileTag from "./pages/ProfileTag/ProfileTag";
import UpdateContextProvider from "./contexts/UpdateContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <UpdateContextProvider>
        <Container maxWidth="xl">
          <AppBar />
        </Container>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/posts" />} />
          <Route exact path="/posts" component={() => <Home />} />
          <Route exact path="/posts/search" component={() => <Home />} />
          <Route
            exact
            path={["/creator/:name", "/tags/:name"]}
            component={() => <ProfileTag />}
          />
          <Route exact path="/posts/:id" component={() => <PostDetails />} />
          <Route
            exact
            path="/auth"
            component={() =>
              !storage.getToken() ? <Auth /> : <Redirect to="/" />
            }
          />
        </Switch>
      </UpdateContextProvider>
    </BrowserRouter>
  );
}

export default App;
