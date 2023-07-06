import { Switch, Route, Redirect } from "react-router-dom";
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
import ProjectFeature from "./project feature/ProjectFeature";
import Contact from "./Contact/Contact";
import Profile from "./profile/Profile";
import NavigationHome from "./navigationbar(home)/NavigationHome";
import ProfileDetails from "./profile/ProfileDetails";

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
      <NavigationHome></NavigationHome>
      <div>
        {" "}
        <div
          style={{
            display: "inline-flex",
            width: "20rem",
            backgroundColor: "lightblue",
            marginRight: "50px",
            marginLeft: "10px",
            boxShadow: "10px 3px 12px black",
          }}
        >
          {loginState ? <NavigationBar></NavigationBar> : ""}
        </div>
        <div
          style={{
            display: "inline-flex",
            width: "70rem",
            marginTop: "15px",
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
            {loginState ? (
              <Route path="/profileDetails" >
                <ProfileDetails></ProfileDetails>
              </Route>
            ) : (
              ""
            )} 
            {loginState ? (
              <Route path="/profile"exact>
                <Profile></Profile>
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
