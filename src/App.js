import { Switch, Route, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import Signup from "./signup/signup.js";
import Login from "./login/Login";
import Welcome from "./Welcome/Welcome";
import NavigationBar from "./navigationBar/navigationBar";
import ComposeMail from "./sendMail/ComposeMail";
import SentMailListPrint from "./sendMail/SentMailListPrint";
import ReadMessage from "./readMessage/ReadMessage";
import AllMail from "./AllMail/AllMail";

function App() {
  return (
    <div>
      {" "}
      <div
        style={{
          display: "inline-flex",
          width: "20rem",
          backgroundColor: "lightblue",
          marginRight:"50px"
        }}
      >
        <NavigationBar></NavigationBar>
      </div>
      <div style={{ display: "inline-flex", width: "70rem",backgroundColor:"honeydew" }}>
        <Switch>
          <Route path="/compose">
            <ComposeMail></ComposeMail>
          </Route>
          <Route path="/sent">
            <SentMailListPrint></SentMailListPrint>
          </Route>
          <Route path="/auth">
            <Login></Login>
          </Route>
          <Route path="/inbox" exact>
            <AllMail></AllMail>
          </Route>
          <Route path="/inbox/:type/:email/:id">
            <ReadMessage></ReadMessage>
          </Route>
          <Route path="/" exact>
            <Signup></Signup>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
