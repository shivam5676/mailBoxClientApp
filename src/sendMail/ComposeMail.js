import { Button } from "react-bootstrap";

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { sentMailSliceActions } from "../store/mailRedux";
const ComposeMail = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const recieverEmailRef = useRef("");
  const subjectRef = useRef("");
  const mailDataHandler = (event) => {
    event.preventDefault();
    const senderEmail = localStorage.getItem("user");
    const senderName="Shivam singh"
    const recieverName="Dummy person"
    const recieverEmail = recieverEmailRef.current.value;
    const subject = subjectRef.current.value;
    const emailData = editor.current.value;
    const myobj = {
      senderName:senderName,
      recieverName:recieverName,
      sender: senderEmail,
      reciever: recieverEmail,
      subject: subject,
      message: emailData,
      read:false
    };
    console.log(myobj);
    // dispatch(sentMailSliceActions.sentMailList(myobj));

    fetch(
      `https://mailboxclient-e8125-default-rtdb.firebaseio.com/reciever/${recieverEmail
        .replace("@", "")
        .replace(".", "")}.json`,
      {
        method: "POST",
        body: JSON.stringify(myobj),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        fetch(
          `https://mailboxclient-e8125-default-rtdb.firebaseio.com/reciever/${recieverEmail
            .replace("@", "")
            .replace(".", "")}/${response.name}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...myobj, id: response.name }),
          }
        ).then((res) => {
          if (!res.ok) {
            throw new Error("put request failedin reciever endpoint");
          }
        });
      })

      .then((response) => {
        fetch(
          `https://mailboxclient-e8125-default-rtdb.firebaseio.com/sender/${senderEmail
            .replace("@", "")
            .replace(".", "")}.json`,
          {
            method: "POST",
            body: JSON.stringify(myobj),
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
            fetch(
              `https://mailboxclient-e8125-default-rtdb.firebaseio.com/sender/${senderEmail
                .replace("@", "")
                .replace(".", "")}/${response.name}.json`,
              {
                method: "PUT",
                body: JSON.stringify({ ...myobj, id: response.name }),
              }
            );
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  // const sentList = useSelector((state) => state.sent.sentmail);
  // console.log(sentList);

  return (
    <div style={{ width: "80rem" }}>
      <form>
        <input
          placeholder="to"
          style={{ width: "80rem" }}
          ref={recieverEmailRef}
          required
        ></input>

        <input
          placeholder="subject"
          style={{ width: "80rem" }}
          ref={subjectRef}
          required
        ></input>

        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
        <Button onClick={mailDataHandler}>SEND</Button>
      </form>
    </div>
  );
};
export default ComposeMail;
