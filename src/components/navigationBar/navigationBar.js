import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavigationBar = () => {
  const unreadmsg = useSelector((state) => state.all.unread);
  return (
    <div>
      <Link to="/compose">
        <Button>COMPOSE</Button>
      </Link>

      <Nav defaultActiveKey="/inbox" className="flex-column">
        <div style={{ display: "inline-flex" }}>
          <Nav.Link href="/inbox" style={{ color: "white" }}><b> Inbox</b>
           
          </Nav.Link>
          <div style={{ display: "inline-flex",backgroundColor:"yellow" }}>unread:{unreadmsg}</div>
        </div>

        <Nav.Link href="/sent" style={{ color: "white" }}>
          <b>sent email</b>
        </Nav.Link>
      </Nav>
    </div>
  );
};
export default NavigationBar;
