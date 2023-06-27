import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LoggedInSliceActions } from "../../store/mailRedux";
const Login = () => {
  const [loginIsSuccessful, setLoginIsSuccessful] = useState(
    localStorage.getItem("key")
  );
  const loginState = useSelector((state) => {
    state.logIn.loggedIn;
  });
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
        setLoginIsSuccessful(true);
        dispatch(LoggedInSliceActions.userLogIn());
      })
      .catch((err) => {
        alert("login Failed......check network connection and login details");
      });
  };
  if (loginIsSuccessful) {
    return <Redirect to="/inbox"></Redirect>;
  }
  return (
    <div>
      <h3>LOGIN PAGE</h3>

      <form>
        {" "}
        <div>
          {" "}
          <input
            style={{
              backgroundColor: "black",
              color: "white",

              width: "40rem",
              margin: "10px 0px 10px 120px",
            }}
            placeholder="email"
            ref={emailHandler}
          ></input>
        </div>
        <div>
          {" "}
          <input
            style={{
              backgroundColor: "black",
              color: "white",
              width: "40rem",
              margin: "10px 0px 10px 120px",
            }}
            placeholder="passsword"
            ref={passwordHandler}
          ></input>
        </div>
        <div style={{ width: "40rem", margin: "10px 0px 10px 120px" }}>
          <Button variant="primary" onClick={LoginDataHandler}>
            LOGIN
          </Button>
          <b style={{ margin: "10px" }}>
            {" "}
            <Link to="/signup">
              Don`t have a account! create a new one
            </Link>{" "}
          </b>
        </div>
      </form>
    </div>
  );
};
export default Login;
