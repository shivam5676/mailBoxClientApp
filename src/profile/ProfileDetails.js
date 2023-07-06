import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoggedInSliceActions } from "../store/mailRedux";

const ProfileDetails = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.logIn.loggedIn);
  const nameHandler = useRef();
  const UserDataSaver = (event) => {
    event.preventDefault();
    const nameValue = nameHandler.current.value;
    console.log(nameValue),
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
              "data not updated yet.check interner connection or try again later"
            );
          }
        })
        .then((response) => {
          console.log("data successful");
          console.log(response);
          setRedirect(true);
          dispatch(LoggedInSliceActions.userLogIn());
        })
        .catch((err) => {
          console.log(err);
        });
  };
  if (redirect) {
    return <Redirect to="/inbox"></Redirect>;
  }

  return (
    <div style={{ height: "300px" }}>
      <h3 style={{ marginLeft: "400px", marginBottom: "30px" }}>
        <b
          style={{
            backgroundColor: "yellow",
            boxShadow: "10px 7px 10px black",
            borderRadius: "10px",
          }}
        >
          USER DETAILS REGISTRATION
        </b>
      </h3>
      <div
        style={{
          backgroundColor: "yellowgreen",
          color: "white",

          width: "55rem",
          height: "170px",
          margin: "20px 30px 10px 120px",
          boxShadow: "10px 7px 10px black",
          borderRadius: "10px",
        }}
      >
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
              placeholder="Name"
              ref={nameHandler}
            ></input>
          </div>
          <div style={{ width: "40rem", margin: "10px 0px 10px 120px" }}>
            <Button variant="primary" onClick={UserDataSaver}>
              UPDATE DETAILS
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileDetails;
