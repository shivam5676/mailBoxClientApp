import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavigationBar = () => {
  return (
    <div >
      <Link to="/compose">
        <Button>COMPOSE</Button>
      </Link>

      <Nav
        defaultActiveKey="/inbox"
        className="flex-column"
        
      >
        <Nav.Link href="/inbox" style={{color:"white"}}>Inbox</Nav.Link>
        <Nav.Link href="/sent" style={{color:"white"}}>sent email</Nav.Link>
      </Nav>
    </div>
  );
};
export default NavigationBar;
