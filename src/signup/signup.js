import { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import navcss from "./signup.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Signup = () => {
  // const nameHandler = useRef("not provided");
  const emailHandler = useRef();
  const passwordHandler = useRef();
  const confirmPasswordHandler = useRef();
  const submitDataHandler = (event) => {
    event.preventDefault();
    if (
      emailHandler.current.value.length == 0 ||
      passwordHandler.current.value.length == 0
    ) {
      return;
    }

    if (
      passwordHandler.current.value !== confirmPasswordHandler.current.value
    ) {
      alert("password and confirm pasword are not same ");
      return;
    }
    // user details registration
    // signup
    const myobj = {
      email: emailHandler.current.value,
      password: passwordHandler.current.value,
      returnSecureToken: true,
    };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
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
        console.log(response);
        localStorage.setItem("user", response.email);
        localStorage.setItem("token", response.idToken);
        setRedirect(true);
        alert(
          "account successfully created,store these email and password for login"
        );
      })
      .catch((err) => {
        console.log(err);
        alert(
          "account not created ,pleasee check ur internet connection or try again later"
        );
      });
  };
  const [redirect, setRedirect] = useState(false);
  console.log(redirect);
  if (redirect) {
    console.log("executed redirection");
    return <Redirect to="/profileDetails"></Redirect>;
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
          ></input>
        </div>
        <div className={navcss.inputs}>
          <input
            placeholder="confirm password"
            ref={confirmPasswordHandler}
            type="password"
          ></input>
        </div>
        <button variant="primary" onClick={submitDataHandler} className={navcss.Signupbutton}>
          SignUp
        </button>
        <b>
          <Link to="/auth">Already have an Account! Login</Link>{" "}
        </b>
      </form>
    </div>
  );
};
export default Signup;
