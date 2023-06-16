import { useRef } from "react";
import { Button } from "react-bootstrap";

const Login = () => {
    const emailHandler = useRef ();
    const passwordHandler = useRef();
    const LoginDataHandler=(event)=>{
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
          ).then((res) => {
            if (res.ok) 
            {return res.json();}
            else{
              throw new Error("network connection is not good")
            }
            
          })
          .then((response)=>{
              console.log(response)
              localStorage.setItem("key",response.idToken)
          })
          .catch((err)=>{
              console.log(err)
          })
    }
  return (
    <form>
      {" "}
      <input
        style={{ backgroundColor: "black", color: "white" }}
        placeholder="email" ref={emailHandler}
      ></input>
      <input
        style={{ backgroundColor: "black", color: "white" }}
        placeholder="passsword" ref={passwordHandler}
      ></input>
       <Button variant="primary" onClick={LoginDataHandler}>
          SUBMIT
        </Button>
    </form>
  );
};
export default Login;
