import { useSelector } from "react-redux";
import LogOut from "../logOut/LogOut";
import navcss from "./navigationHome.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import LogOuts from "../logOut/LogOut";

const NavigationHome = () => {
  const loggedIn = localStorage.getItem("user");
  const loginState = useSelector((state) => state.logIn.loggedIn);
  return (
    <div className={navcss.navigation}>
      <div className={navcss.brand}>In-Mail</div>
      <div className={navcss.navlink}>
        {loginState ? <NavLink to="/contact">Contact us</NavLink> : ""}
{loginState?<NavLink to="/profile">Profile</NavLink>:""}
        {loggedIn ? (
          <LogOuts></LogOuts>
        ) : (
          <NavLink to="/auth">Signin/SignUP</NavLink>
        )}
      </div>
    </div>
  );
};
export default NavigationHome;
