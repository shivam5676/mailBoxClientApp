import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { LoggedInSliceActions, allMailSliceActions } from "../store/mailRedux";

const LogOut = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(LoggedInSliceActions.userLogOut());
    dispatch(allMailSliceActions.logOutHandler());
  
  };

  return (
    <Button onClick={logoutHandler}  style={{ backgroundColor: "red"}}>
     <b>LOGOUT</b> 
    </Button>
  );
};
export default LogOut;
