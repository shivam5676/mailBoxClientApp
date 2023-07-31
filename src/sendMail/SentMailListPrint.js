import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Nav } from "react-bootstrap";
import DeleteEmail from "./deleteEmail";
import { sentMailSliceActions } from "../store/mailRedux";
import navcss from "./sentmail.module.css";
import { TbPointFilled } from "react-icons/tb";

const SentMailListPrint = () => {
  const sentList = useSelector((state) => state.sent.sentmail);
  const recieverName = localStorage.getItem("username");
  const senderEmail = localStorage
    .getItem("user")
    .replace("@", "")
    .replace(".", "");
  const dispatch = useDispatch();
  console.log(senderEmail);
  useEffect(() => {
    fetch(
      `https://mailboxclient-e8125-default-rtdb.firebaseio.com/sender/${senderEmail}.json`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("post request failedin sender endpoint");
        } else {
          return res.json();
        }
      })
      .then((response) => {
        if (response !== null) {
          Object.values(response).map((currentitem) => {
            dispatch(sentMailSliceActions.sentMailList(currentitem));
          });
        }
      });
  }, []);

  let newArray = sentList.map((currentitem) => (
    <div key={currentitem.id}>
      <Link to={`/inbox/sender/${senderEmail}/${currentitem.id}`}>
 
        <div className={navcss.maillist}>
        {!currentitem.read ?<div className={navcss.readstatus}><TbPointFilled></TbPointFilled></div>:<div className={navcss.readstatus}></div>}
          
          <div className={navcss.sender}>
            <p className={navcss.sendername}>
              {currentitem.reciever.split("@")[0]}
            </p>
            <div className={navcss.sendermsg}>{currentitem.subject}</div>{" "}
            {/* <DeleteEmail id={currentitem.id}></DeleteEmail> */}
          </div>
        </div>
      </Link>
    </div>
  ));

  if (sentList.length == "0") {
    newArray = <h3>no sent email present ,compose a new mail</h3>;
  }

  return <div className={navcss.maincontent}>{newArray}</div>;
};
export default SentMailListPrint;
