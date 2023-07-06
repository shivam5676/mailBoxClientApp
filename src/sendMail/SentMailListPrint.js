import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Nav } from "react-bootstrap";
import DeleteEmail from "./deleteEmail";
import { sentMailSliceActions } from "../store/mailRedux";

const SentMailListPrint = () => {
  const sentList = useSelector((state) => state.sent.sentmail);
const recieverName=localStorage.getItem("username")
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
        <div
          style={{
            display: "inline-flex",
            boxShadow: "0px 0px 12px 5px",
            width: "65rem",
          }}
        >
          <div style={{ width: "3rem" }}>
            {currentitem.read ? (
              ""
            ) : (
              <b style={{ color: "blue", fontSize: "35px" }}>.</b>
            )}
          </div>{" "}
          <div style={{ width: "12rem" }}>
            <p>
              <b>{currentitem.senderName}</b>
            </p>
          </div>
          <div style={{ width: "35rem" }}>
            {" "}
            <h4>{currentitem.subject}</h4>
          </div>
          <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
            {currentitem.reciever}
          </p>
        </div>
      </Link>{" "}
      <DeleteEmail id={currentitem.id}></DeleteEmail>
      <hr></hr>
    </div>
  ));
  
  if(sentList.length=="0")
  {
    newArray=<h3>no sent email present ,compose a new mail</h3>
  }
 

  return <div style={{boxShadow:"0px 0px 9px 2px  black"}}>{newArray}</div>;
};
export default SentMailListPrint;
