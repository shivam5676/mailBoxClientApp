import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavigationBar = () => {
  const unreadmsg = useSelector((state) => state.all.unread);

  return (
    <div>
      <Link to="/compose">
        <Button style={{ boxShadow: "0px 0px 15px 2px black" }}>COMPOSE</Button>
      </Link>

      <Nav defaultActiveKey="/inbox" className="flex-column">
        <div style={{ display: "inline-flex" }}>
          <Nav.Link href="/inbox">
            <b> Inbox</b>
          </Nav.Link>
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "yellow",
              boxShadow: "0px 0px 15px 2px black",
              margin:"5px"
            }}
          >
            unread:{unreadmsg}
          </div>
        </div>

        <Nav.Link href="/sent">
          <b>sent email</b>
        </Nav.Link>
      </Nav>
    </div>
  );
};
export default NavigationBar;
