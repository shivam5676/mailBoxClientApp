import { useRef } from "react";

import navcss from "./contact.module.css";

const Contact = () => {
  const senderEmail = localStorage.getItem("user");
  const nameRef = useRef("");
  const feedbackRef = useRef("");
  const messageref = useRef("");
  const emailRef = useRef("");
  const sendMessageHandler = (event) => {
    event.preventDefault();
    const myobj = {
      name: nameRef.current.value,
      emailRef: emailRef.current.value,
      message: messageref.current.value,
      feedback: feedbackRef.current.value,
    };
    fetch(
      `https://mailboxclient-e8125-default-rtdb.firebaseio.com/message/${
        myobj.feedback
      }/${senderEmail.replace("@", "").replace(".", "")}.json`,
      {
        method: "POST",
        body: JSON.stringify(myobj),
      }
    ).then((res) => {
      if (res.ok) {
        alert("your message has been successfully recieved by us.....thank u");
      } else {
        alert(
          "Message sending Failed,check your internet or try again after some time"
        );
      }
    });
  };

  return (
    <div className={navcss.maincontent}>
     
      <div className={navcss.formbox}>
        <form className={navcss.forms}> <p className={navcss.contacttext}>CONTACT FORM</p>
        <hr></hr>
          <p>PLEASE SELECT TYPE:</p>
          <select ref={feedbackRef} className={navcss.feedback}>
            <option>FEEDBACK</option>
            <option>BUG</option>
            <option>ERROR</option>
            <option>FUNCTION NOT WORKING</option>
          </select>
          <div className={navcss.inputs}>
            <input
              defaultValue={nameRef.current.value}
              ref={nameRef}
              placeholder="NAME"
            ></input>
          </div>
          <div className={navcss.inputs}>
            <input ref={emailRef} placeholder="Contact No"></input>
          </div>
          <div className={navcss.inputs}>
            <input placeholder="message" className={navcss.msginput}></input>
          </div>

          <button onClick={sendMessageHandler} className={navcss.buttonsignup}>
            Send contact Details
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
