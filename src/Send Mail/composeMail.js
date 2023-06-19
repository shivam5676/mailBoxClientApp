import React from "react"
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import SentMailList from "./SentMailListPrint";
import { useDispatch } from "react-redux";
import { sentMailSliceActions } from "../store/mailRedux";

const ComposeMail=()=>{
    const dispatch=useDispatch();
    const recieverEmailIdRef = useRef();
    const subjectRef = useRef();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const senderMail = "techking08@gmail.com";
    const sendEmailHandler = () => {
      const myobj = {
        recieverEmail: recieverEmailIdRef.current.value,
        subject: subjectRef.current.value,
        content: editor.current.value,
        senderEmail:senderMail
      };
      console.log(myobj);
      fetch(
        `https://mailboxclient-e8125-default-rtdb.firebaseio.com/${myobj.recieverEmail
          .replace(".", "")
          .replace("@", "")}.json`,
        {
          method: "POST",
          body: JSON.stringify(myobj),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else throw new Error("mail sending error");
        })
        .then((response) => {
          console.log(response.name);
          fetch(
            `https://mailboxclient-e8125-default-rtdb.firebaseio.com/
            ${senderMail
              .replace(".", "")
              .replace("@", "")}/sent.json`,
            {
              method: "POST",
              body:JSON.stringify(myobj)
            }
          )
            .then((response) => {
                dispatch(sentMailSliceActions.sentMailList(myobj))
              console.log(response);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return(
<React.Fragment>
<input
        type="text"
        placeholder="to"
        style={{ width: "100rem" }}
        ref={recieverEmailIdRef}
      ></input>
      <input
        type="text"
        placeholder="subject"
        style={{ width: "100rem" }}
        ref={subjectRef}
      ></input>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent;
        }}
      ></JoditEditor>
      <Button onClick={sendEmailHandler}>send</Button>
      <SentMailList></SentMailList>
</React.Fragment>
    )
}
export default ComposeMail