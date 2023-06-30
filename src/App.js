import { Switch, Route, Redirect } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Signup from "./signup/signup.js";
import Login from "./login/Login";

import NavigationBar from "./navigationBar/navigationBar";
import ComposeMail from "./sendMail/ComposeMail";
import SentMailListPrint from "./sendMail/SentMailListPrint";
import ReadMessage from "./readMessage/ReadMessage";
import AllMail from "./AllMail/AllMail";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInSliceActions } from "./store/mailRedux";
import { Fragment, useEffect } from "react";
import LogOut from "./logOut/LogOut";
import ProjectFeature from "./project feature/ProjectFeature";
import Contact from "./Contact";

function App() {
  const loginState = useSelector((state) => state.logIn.loggedIn);
  console.log(loginState);
  const dispatch = useDispatch();
  const loggedIn = localStorage.getItem("user");
  useEffect(() => {
    if (loggedIn) {
      dispatch(LoggedInSliceActions.userLogIn());
    }
  }, []);
  return (
    <Fragment>
      <Navbar style={{ backgroundColor: "pink" }}>
        <Container>
          <div>
            <Navbar.Brand href="/inbox">
              <b>In-Mail</b>
            </Navbar.Brand>
          </div>
          <div>
            <Nav className="me-auto">
              <div style={{ backgroundColor: "white", fontStyle: "oblique" }}>
                <b>{loggedIn}</b>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Nav.Link href="/contact">
                  <b>Contact us</b>{" "}
                </Nav.Link>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Nav.Link href="/features">
                  <b>Project Features</b>
                </Nav.Link>
              </div>{" "}
              {loggedIn ? (
                ""
              ) : (
                <div style={{ marginLeft: "10px" }}>
                  <Nav.Link href="/">
                    <b>SIGN IN/SIGN UP</b>{" "}
                  </Nav.Link>
                </div>
              )}
              {loginState ? (
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <Nav.Link href="/profile">
                    <b>Profile</b>
                  </Nav.Link>
                </div>
              ) : (
                ""
              )}
              {loginState ? (
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <LogOut></LogOut>
                </div>
              ) : (
                ""
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div>
        {" "}
        <div
          style={{
            display: "inline-flex",
            width: "20rem",
            backgroundColor: "lightblue",
            marginRight: "50px",
            marginLeft: "10px",
          }}
        >
          {loginState ? <NavigationBar></NavigationBar> : ""}
        </div>
        <div
          style={{
            display: "inline-flex",
            width: "70rem",
            backgroundColor: "honeydew",
            marginTop: "10px",
          }}
        >
          <Switch>
            {loginState ? (
              <Route path="/compose">
                <ComposeMail></ComposeMail>
              </Route>
            ) : (
              ""
            )}
            {loginState ? (
              <Route path="/sent">
                <SentMailListPrint></SentMailListPrint>
              </Route>
            ) : (
              ""
            )}
            {loginState ? (
              <Route path="/inbox" exact>
                <AllMail></AllMail>
              </Route>
            ) : (
              ""
            )}
            {loginState ? (
              <Route path="/inbox/:type/:email/:id" exact>
                <ReadMessage></ReadMessage>
              </Route>
            ) : (
              ""
            )}
            <Route path="/features">
              <ProjectFeature></ProjectFeature>
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>

            <Route path="/signup">
              {!loginState ? <Signup></Signup> : "/inbox"}
            </Route>
            <Route path="/">
              {!loginState ? (
                <Login></Login>
              ) : (
                <Redirect to="/inbox"></Redirect>
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
