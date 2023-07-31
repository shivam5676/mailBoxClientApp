import { Switch, Route, Redirect } from "react-router-dom";
import navcss from "./App.module.css";
import Signup from "./signup/signup.js";
import Login from "./login/Login";
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
import SidePanel from "./navigationBar/SidePanel";

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
    <div className={navcss.container}>
      <NavigationHome></NavigationHome>
      

      {loginState ? <SidePanel></SidePanel> : ""}

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
          <Route path="/profileDetails">
            <ProfileDetails></ProfileDetails>
          </Route>
        ) : (
          ""
        )}
        {loginState ? (
          <Route path="/profile" exact>
            <Profile></Profile>
          </Route>
        ) : (
          ""
        )}
        {loginState ? <Route path="/features">
          <ProjectFeature></ProjectFeature>
        </Route>:""}
        
       {loginState ? <Route path="/contact">
          <Contact></Contact>
        </Route>:""} 

        <Route path="/signup">
          {!loginState ? <Signup></Signup> : "/inbox"}
        </Route>
        <Route path="/">
          {!loginState ? <Login></Login> : <Redirect to="/inbox"></Redirect>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
