import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInSliceActions } from "../../store/mailRedux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const LogOut = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(LoggedInSliceActions.userLogOut());
  };

  return (
    <Button onClick={logoutHandler}  style={{ backgroundColor: "red"}}>
     <b>LOGOUT</b> 
    </Button>
  );
};
export default LogOut;
