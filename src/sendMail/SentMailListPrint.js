import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentMailSliceActions } from "../store/mailRedux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SentMailListPrint = () => {
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
  const sentList = useSelector((state) => state.sent.sentmail);
  const newArray = sentList.map((currentitem) => (
    <Link
      to={`/inbox/sender/${senderEmail}/${currentitem.id}`}
      key={currentitem.id}
    >
      <div key={currentitem.id} style={{ marginLeft: "40px" }}>
        {currentitem.read ? (
          ""
        ) : (
          <b style={{ color: "blue", fontSize: "35px" }}>.</b>
        )}
        <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
          {currentitem.recieverName}
        </p>
        <h4 style={{ display: "inline-flex" }}>{currentitem.subject}</h4>
        <hr></hr>
      </div>
    </Link>
  ));

  return <div>{newArray}</div>;
};
export default SentMailListPrint;