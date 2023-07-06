import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readMailSliceActions } from "../store/mailRedux";
import { useEffect } from "react";

const ReadMessage = () => {
  const dispatch = useDispatch();
  const readState = useSelector((state) => state.reads.readmail);
  console.log(readState);
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
  const recieverName = localStorage.getItem("username")
  const senderEmail = readState.sender;
  const recieverEmail=readState.reciever
  const message=readState.message
  return (
    <div>
      <div>
        {" "}
        <h4 style={{ display: "inline-flex" }}>from:{senderName}</h4>
        <p style={{ display: "inline-flex" }}>{`<${senderEmail}>`}</p>
      </div>

      <h5 style={{ display: "inline-flex" }}>to:{recieverName}</h5>
      <h5 style={{ display: "inline-flex" }}>{`<${recieverEmail}>`}</h5>
      <hr></hr>
      {message}
    </div>
  );
};
export default ReadMessage;
