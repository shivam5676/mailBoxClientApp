
// import ComposeMail from "../Send Mail/composeMail";
import AllMail from "../AllMail/AllMail";
import NavigationBar from "../navigationBar/navigationBar";
import SentMailListPrint from "../sendMail/SentMailListPrint";
// import RecieveMail from "../recieveMail/recieveMail";

const Welcome = () => {
  return (
    <div>
      {" "}
      <h2>welcome to home Page</h2>
      <div
        style={{ width: "80rem", backgroundColor: "yellow", float: "right" }}
      >
      <AllMail></AllMail>
      </div>
      <div
        style={{ width: "20rem", float: "left" }}
      >
        
      </div>
    </div>
  );
};
export default Welcome;
