import { Switch, Route, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import Signup from "./signup/signup.js";
import Login from "./login/Login";
import Welcome from "./Welcome/Welcome";

function App() {
  
  return (
    <Switch>
      <Route path="/auth">
        <Login></Login>
      </Route>
      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>{" "}
      <Route path="/">
        <Signup></Signup>
      </Route>
    </Switch>
  );
}

export default App;
