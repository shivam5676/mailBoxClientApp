import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoggedInSliceActions } from "../store/mailRedux";
import navcss from "./profiledetails.module.css"

const ProfileDetails = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logIn.loggedIn);
  const nameHandler = useRef();
   
  const UserDataSaver = (event) => {
   
    event.preventDefault();
    const nameValue = nameHandler.current.value;
    console.log(nameValue)
      // AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: nameValue,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(
              "data not updated yet.check internet connection or try again later"
            );
          }
        })
        .then((response) => {
         localStorage.setItem("username",nameValue)
          setRedirect(true);
          dispatch(LoggedInSliceActions.userLogIn());
          
        })
        .catch((err) => {
          alert(err)
        });
  };
  if (redirect) {
    return <Redirect to="/profile"></Redirect>;
  }

  return (
    <div className={navcss.mainbox}>
      <div className={navcss.formbox}>
        <p className={navcss.namepara}>user name update panel</p>
        <form className={navcss.form}>
          <input placeholder="enter name " ref={nameHandler}></input>
          <button onClick={UserDataSaver}>
              UPDATE NAME
            </button>
        </form>
      </div>
    </div>
  );
};
export default ProfileDetails;
