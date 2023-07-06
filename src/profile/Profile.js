import { Button, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
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
    })
    .catch((err) => {
      console.log(err);
    });
  let username = "not provided yet";
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
  }

  return (
    <div style={{ width: "70rem", boxShadow: "10px 3px 12px black" }}>
      <div style={{ width: "70rem", marginBottom: "20px" }}>
        <h2 style={{ textAlign: "center" }}>User details</h2>
        <div style={{ display: "inline-flex" }}>
          <div
            style={{
              backgroundColor: "red",
              width: "50rem",
              marginRight: "20px",
              boxShadow: "0px 0px 12px 2px black",
              display: "inline-flex",
            }}
          >
            <div style={{ width: "42rem" }}>
              <div style={{ display: "inline-flex" }}>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 5px 4px black",
                    color: "white",
                  }}
                >
                  Name :
                </h4>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 2px 1px black",
                    color: "white",
                  }}
                >
                  {username}
                </h4>
              </div>
              <hr></hr>
              <div style={{ display: "inline-flex" }}>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 5px 4px black",
                    color: "white",
                  }}
                >
                  Email :
                </h4>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 2px 1px black",
                    color: "white",
                  }}
                >
                  {localStorage.getItem("user")}
                </h4>
              </div>
              <hr></hr>
              <div style={{ display: "inline-flex" }}>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 5px 4px black",
                    color: "white",
                  }}
                >
                  Mobile
                </h4>
                <h4
                  style={{
                    width: "10rem",
                    textShadow: "4px 2px 1px black",
                    color: "white",
                  }}
                >
                  not working
                </h4>
              </div>
            </div>
            <div
              style={{
                backgroundSize: "cover",
                height: "120px",
                width: "110px",
                boxShadow: "0px 0px 10px 3px  black",
              }}
            >
              <div style={{ height: "130px" }}>
                <img src="ImageFilePath" alt="profile photo"></img>
              </div>

              <Button>Change Photo</Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "yellow",
              width: "18rem",
              boxShadow: "10px 3px 12px black",
            }}
          >
            <NavLink href="/profileDetails"> <b>Update Name</b></NavLink>
            
            <hr></hr>
            <b>Change Email</b>
            <hr></hr>
            <b>Update Password</b>
            <hr></hr>
            <b>update Mobile</b>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
