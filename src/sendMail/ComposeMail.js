import { Button } from "react-bootstrap";

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import navcss from "./composemail.module.css";
import SidePanel from "../navigationBar/SidePanel";

const ComposeMail = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const recieverEmailRef = useRef("");
  const subjectRef = useRef("");
  const mailDataHandler = (event) => {
    event.preventDefault();
    if (!recieverEmailRef.current.value.includes("@")) {
      alert("please enter valid email id");
      return;
    }
    const senderEmail = localStorage.getItem("user");
    const senderName = localStorage.getItem("username");
    const recieverEmail = recieverEmailRef.current.value;
    const subject = subjectRef.current.value;
    const emailData = editor.current.value;
    const myobj = {
      senderName: senderName,

      sender: senderEmail,
      reciever: recieverEmail,
      subject: subject,
      message: emailData,
      read: false,
    };

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
              alert("email sent successfully");
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

  return (
    <>
    <SidePanel></SidePanel>
    <div className={navcss.mainbox}>
      <div className={navcss.formbox}>
        <form>
          <div className={navcss.input}>
            <input placeholder="to" ref={recieverEmailRef} required></input>
          </div>
          <div className={navcss.input}>
            <input placeholder="subject" ref={subjectRef} required></input>
          </div>

          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          <div className={navcss.button}>
          <Button onClick={mailDataHandler}>SEND</Button>
        </div>
        </form>
        
      </div>
    </div></>
  );
};
export default ComposeMail;
