import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LoggedInSliceActions } from "../store/mailRedux";
import navcss from "./Login.module.css";
const Login = () => {
  const [loginIsSuccessful, setLoginIsSuccessful] = useState(
    localStorage.getItem("key")
  );
  const loginState = useSelector((state) => state.logIn.loggedIn);

  const dispatch = useDispatch();
  console.log(loginIsSuccessful);
  const emailHandler = useRef();
  const passwordHandler = useRef();
  const LoginDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      email: emailHandler.current.value,
      password: passwordHandler.current.value,
      returnSecureToken: true,
    };
    // fetch(
    //   "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       idToken: localStorage.getItem("token"),
    //       returnSecureToken: true,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       throw new Error(
    //         "data not updated yet.check interner connection or try again later"
    //       );
    //     }
    //   })
    //   .then((response) => {
    //     localStorage.setItem("username", response.users[0].displayName);
    //     localStorage.setItem("user",response.users[0].email)
    //     // setuserName(localStorage.getItem("username"))
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
      {
        method: "POST",
        body: JSON.stringify(myobj),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("network connection is not good");
        }
      })
      .then((response) => {
        localStorage.setItem("user", response.email);
        localStorage.setItem("token", response.idToken);

        dispatch(LoggedInSliceActions.userLogIn());
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
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
                "data not updated yet.check interner connection or try again later"
              );
            }
          })
          .then((response) => {
            localStorage.setItem("username", response.users[0].displayName);
            localStorage.setItem("user", response.users[0].email);
          });

        setLoginIsSuccessful(true);
      })
      .catch((err) => {
        alert("login Failed......check network connection and login details");
      });
  };
  if (loginIsSuccessful) {
    return <Redirect to="/inbox"></Redirect>;
  }

  return (
    <div className={navcss.containers}>
      <form className={navcss.formcontrol}>
        <div className={navcss.inputs}>
          <input placeholder="email" ref={emailHandler} type="email"></input>
        </div>
        <div className={navcss.inputs}>
        <input
          placeholder="password"
          ref={passwordHandler}
          type="password"
        ></input></div>
        <button variant="primary" onClick={LoginDataHandler} className={navcss.loginbtn}>
          LOGIN
        </button>
        <p className={navcss.signuplink}>
          <Link to="/signup">Don`t have an account! create a new one</Link>{" "}
        </p>
      </form>
    </div>
  );
};
export default Login;
