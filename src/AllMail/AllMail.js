import { useDispatch, useSelector } from "react-redux";
import { allMailSliceActions } from "../store/mailRedux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AllMail = () => {
  let RecieverEmail = localStorage.getItem("user");
  if (RecieverEmail) {
    RecieverEmail = RecieverEmail.replace("@", "").replace(".", "");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      // Code will be executed on every 2 seconds
      fetch(
        `https://mailboxclient-e8125-default-rtdb.firebaseio.com/reciever/${RecieverEmail}.json`,
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
          console.log(response);
          let count = 0;
          if (response !== null) {
            Object.values(response).map((currentitem) => {
              dispatch(allMailSliceActions.allMailList(currentitem));
              if (currentitem.read === false) {
                count++;
                dispatch(allMailSliceActions.unreadMail(count));
              }
            });
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const recieveList = useSelector((state) => state.all.allmail);
  let newArray = recieveList.map((currentitem) => (
    <div key={currentitem.id}>
      <Link to={`/inbox/reciever/${RecieverEmail}/${currentitem.id}`}>
        <div
          style={{
            display: "inline-flex",
            boxShadow: "0px 0px 12px 5px",
            width: "65rem",
          }}
        >
          <div style={{ width: "3rem" }}>
            {currentitem.read ? (
              ""
            ) : (
              <b style={{ color: "blue", fontSize: "35px" }}>.</b>
            )}
          </div>{" "}
          <div style={{ width: "12rem" }}>
            <p>
              <b>{currentitem.senderName}</b>
            </p>
          </div>
          <div style={{ width: "35rem" }}>
            {" "}
            <h4>{currentitem.subject}</h4>
          </div>
          <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
            {currentitem.sender}
          </p>
        </div>
      </Link>
      <hr></hr>
    </div>
  ));
  if (recieveList.length == "0") {
    newArray = <h3>inbox is empty</h3>;
  }

  return <div>{newArray}</div>;
};
export default AllMail;
