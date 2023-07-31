import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readMailSliceActions } from "../store/mailRedux";
import { useEffect } from "react";
import htmlToFormattedText from "html-to-formatted-text";
import navcss from "./readmsg.module.css";

const ReadMessage = () => {
  const dispatch = useDispatch();
  const readState = useSelector((state) => state.reads.readmail);
  const params = useParams();
  useEffect(() => {
    fetch(
      `https://mailboxclient-e8125-default-rtdb.firebaseio.com/${params.type}/${params.email}/${params.id}.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("could not get id data.....try again");
      })
      .then((response) => {
        console.log(response);
        fetch(
          `https://mailboxclient-e8125-default-rtdb.firebaseio.com/${params.type}/${params.email}/${params.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...response, read: true }),
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else throw new Error("could not get id data.....try again");
          })
          .then((response) => {
            dispatch(readMailSliceActions.readMailList(response));
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(readState);
  const senderName = readState.senderName;

  const senderEmail = readState.sender;
  const recieverEmail = readState.reciever;
  const message = readState.message;
  return (
    <div className={navcss.readcontainer}>
      <div className={navcss.userdetails}>
        <h5>{`To: <${recieverEmail}>`}</h5>
        <h4>From : {senderName} {`<${senderEmail}>`}</h4>
        {/* <span>{`<${senderEmail}>`}</span> */}
      </div>
      <hr></hr>
      <p className={navcss.usermessage}>
      {htmlToFormattedText(message)}
      </p>
    </div>
  );
  //(

  // <div style={{ boxShadow: "10px 3px 12px black", width: "70rem" }}>
  //   {" "}
  //   <div>
  //     {" "}
  //     <h5 style={{ display: "inline-flex" }}>{`To: <${recieverEmail}>`}</h5>
  //   </div>
  //   <div style={{ textAlign: "center" }}>
  //     {" "}
  //     <h4 style={{ display: "inline-flex" }}>From : {senderName}</h4>
  //     <p style={{ display: "inline-flex" }}>{`<${senderEmail}>`}</p>
  //   </div>
  //   <hr></hr>
  //   <div style={{ marginLeft: "50px" }}>{htmlToFormattedText(message)}</div>
  // </div>
  // );
};
export default ReadMessage;
