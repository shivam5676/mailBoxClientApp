import { useRef } from "react";
import { Container } from "react-bootstrap";

const Contact = () => {
  const senderEmail = localStorage.getItem("user");
  const nameRef=useRef()
  const messageref=useRef()
  const emailRef=useRef()
  const sendMessageHandler=(event)=>{
    event.preventDefault()
    const myobj={
      name:nameRef.current.value,
      emailRef:emailRef.current.value,
      message:messageref.current.value
    }
    fetch(
      `https://mailboxclient-e8125-default-rtdb.firebaseio.com/message/${senderEmail
        .replace("@", "")
        .replace(".", "")}.json`,
      {
        method: "POST",
        body: JSON.stringify(myobj),
      }
    ).then((res) => {
      if(res.ok){
alert("your message has been successfully recieved by us.....thank u")
        // return res.json()
      }
      else {
        alert("Message sending Failed,check your internet or try again after some time");
      }
    });
  }

  return (
    <div style={{ width: "80rem", height: "420px",marginTop:"10px",boxShadow:"0px 0px 5px 4px",backgroundColor:"" }}>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        <b style={{ color: "goldenrod", textShadow: "initial" }}>
          CONTACT FORM
        </b>
      </h3>
      <Container
        style={{
          borderBlockStyle: "double",
          backgroundColor: "pink",
          width: "60rem",
          boxShadow: "10px 12px 19px #F4AAB9",
          borderRadius: "10px",
        }}
      >
        <form>
          <div>
            <input
            ref={nameRef}
              placeholder="NAME"
              style={{ width: "600px", margin: "20px 10px 10px 150px" }}
            ></input>
          </div>
          <div>
            <input
            ref={emailRef}
              placeholder="Contact No"
              style={{ width: "600px", margin: "20px 10px 10px 150px" }}
            ></input>
          </div>
          <div>
            <input
            ref={messageref}
              placeholder="message"
              style={{
                width: "600px",
                margin: "20px 10px 10px 150px",
                height: "100px",
              }}
            ></input>
          </div>

          <button
            style={{
              width: "300px",
              margin: "20px 10px 10px 280px",
              borderRadius: "10px",
              boxShadow:"0px 0px 12px 5px black",
              backgroundColor: "red",
              color: "whitesmoke"
            }}
            onClick={sendMessageHandler}
          >
            <b>Send contact Details</b>
          </button>
        </form>
      </Container>
    </div>
  );
};
export default Contact;
