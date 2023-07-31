import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import navcss from "./sidepanel.module.css";
import LogOuts from "../logOut/LogOut";

const SidePanel = () => {
  const unreadmsg = useSelector((state) => state.all.unread);

  return (
    <div className={navcss.sidepanel}>
      <div className={navcss.visiblelink}>
        <NavLink to="/compose" >
          <div className={navcss.composebutton}>Compose</div>
        </NavLink>
        <hr></hr>

        <div className={navcss.linkborder}>
          <NavLink to="/inbox">Inbox</NavLink>
          <span>{unreadmsg}</span>
        </div>
        <hr></hr>

        <div className={navcss.linkborder}>
          <NavLink to="/sent">Sent</NavLink>
        </div>
      </div>
      <hr></hr>
      <div className={navcss.invisiblelink}>
        <div className={navcss.linkborder}>
          {" "}
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <hr></hr>

        <div className={navcss.linkborder}>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <hr></hr>
        <LogOuts className={navcss.logoutbtn}></LogOuts>
      </div>
    </div>
  );
};
export default SidePanel;
