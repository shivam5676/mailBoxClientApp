import { useRef } from "react";
import { Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";

const Signup = () => {
  const emailHandler = useRef();
  const passwordHandler = useRef();
  const confirmPasswordHandler = useRef();
  const submitDataHandler = (event) => {
    event.preventDefault();

    if (
      passwordHandler.current.value !== confirmPasswordHandler.current.value
    ) {
      return;
    }
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
        alert("signup Successful now u can login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h3>SIGNUP PAGE</h3>
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
  );
};
export default Signup;
