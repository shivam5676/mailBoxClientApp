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
    ).then((res) => {
      if (res.ok) 
      {return res.json();}
      else{
        throw new Error("network connection is not good")
      }
      
    })
    .then((response)=>{
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })
  };
  return (
    <form>
      <div style={{ display: "block" }}>
        <input type="email" placeholder="EMAIL" ref={emailHandler}></input>
        <input
          type="password"
          placeholder="PASSWORD"
          ref={passwordHandler}
        ></input>
        <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          ref={confirmPasswordHandler}
        ></input>
        <Button variant="primary" onClick={submitDataHandler}>
          SIGNUP
        </Button>
       <Link to="/auth">login page</Link>
      </div>
    </form>
  );
};
export default Signup;
