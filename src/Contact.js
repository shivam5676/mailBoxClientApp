import { Container } from "react-bootstrap";

const Contact = () => {
  return (
    <div style={{ width: "80rem", height: "420px" }}>
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
              placeholder="NAME"
              style={{ width: "600px", margin: "20px 10px 10px 150px" }}
            ></input>
          </div>
          <div>
            <input
              placeholder="Contact No"
              style={{ width: "600px", margin: "20px 10px 10px 150px" }}
            ></input>
          </div>
          <div>
            <input
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
              margin: "20px 10px 10px 250px",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "whitesmoke",
            }}
          >
            <b>Send contact Details</b>
          </button>
        </form>
      </Container>
    </div>
  );
};
export default Contact;
