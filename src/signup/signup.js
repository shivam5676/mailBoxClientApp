import { useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";

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
       setRedirect(true)
       alert("account successfully created,store these email and password for login")

      })
      .catch((err) => {
        console.log(err);
        alert("account not created ,pleasee check ur internet connection or try again later")
      });
  };const [redirect,setRedirect]=useState(false)
  console.log(redirect)
  if(redirect){
    console.log("executed redirection");
    return <Redirect to="/profileDetails"></Redirect>
  }
  return (
    <div style={{ height: "350px" }}>
      <h3 style={{ marginLeft: "400px", marginBottom: "30px" }}>
        <b
          style={{
            backgroundColor: "yellow",
            boxShadow: "10px 7px 10px black",
            borderRadius: "10px",
          }}
        >
          SIGNUP PAGE
        </b>
      </h3>
      <div
        style={{
          backgroundColor: "yellowgreen",
          color: "white",

          width: "55rem",
          height: "270px",
          margin: "10px 30px 10px 120px",
          boxShadow: "10px 7px 10px black",
          borderRadius: "10px",
        }}
      >
        <form style={{ display: "block" }}>
          <div style={{ display: "block" }}>
            <div>
              <input
                type="email"
                placeholder="EMAIL"
                ref={emailHandler}
                style={{
                  backgroundColor: "black",
                  color: "white",

                  width: "40rem",
                  margin: "10px 0px 10px 120px",
                }}
              ></input>
            </div>
            <div>
              {" "}
              <input
                type="password"
                placeholder="PASSWORD"
                ref={passwordHandler}
                style={{
                  backgroundColor: "black",
                  color: "white",

                  width: "40rem",
                  margin: "10px 0px 10px 120px",
                }}
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                ref={confirmPasswordHandler}
                style={{
                  backgroundColor: "black",
                  color: "white",

                  width: "40rem",
                  margin: "10px 0px 10px 120px",
                }}
              ></input>
            </div>

            <div style={{ width: "40rem", margin: "10px 0px 10px 120px" }}>
              {" "}
              <Button variant="primary" onClick={submitDataHandler}>
                SIGNUP
              </Button>
              <b style={{ margin: "10px" }}>
                {" "}
                <Link to="/auth">Already have an Account! Login</Link>
              </b>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
