import { Container, Nav, Navbar } from "react-bootstrap"
import { useSelector } from "react-redux";
import LogOut from "../logOut/LogOut";

const NavigationHome=()=>{
    const loggedIn = localStorage.getItem("user");
    const loginState = useSelector((state) => state.logIn.loggedIn);
    return(
        <Navbar style={{ backgroundColor: "pink",boxShadow:"0px 5px 4px 2px black" }}>
        <Container>
          <div>
            <Navbar.Brand href="/inbox">
              <b>In-Mail</b>
            </Navbar.Brand>
          </div>
          <div>
            <Nav className="me-auto">
              <div style={{ backgroundColor: "white", fontStyle: "oblique" }}>
                <b>{loggedIn}</b>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Nav.Link href="/contact">
                  <b>Contact us</b>{" "}
                </Nav.Link>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Nav.Link href="/features">
                  <b>Project Features</b>
                </Nav.Link>
              </div>{" "}
              {loggedIn ? (
                ""
              ) : (
                <div style={{ marginLeft: "10px" }}>
                  <Nav.Link href="/">
                    <b>SIGN IN/SIGN UP</b>{" "}
                  </Nav.Link>
                </div>
              )}
              {loginState ? (
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <Nav.Link href="/profile">
                    <b>Profile</b>
                  </Nav.Link>
                </div>
              ) : (
                ""
              )}
              {loginState ? (
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <LogOut></LogOut>
                </div>
              ) : (
                ""
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    )
}
export default NavigationHome