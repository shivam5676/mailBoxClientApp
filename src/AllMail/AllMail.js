import { useDispatch, useSelector } from "react-redux";
import { allMailSliceActions } from "../store/mailRedux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AllMail = () => {
  const RecieverEmail = "shivam@gmail.com".replace("@", "").replace(".", "");
  const dispatch = useDispatch();
  //   console.log(senderEmail);
  useEffect(() => {
    const interval = setInterval(() => {
      // Code to be executed every 2 seconds
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
          let count=0;
          if (response !== null) {
            Object.values(response).map((currentitem) => {
              dispatch(allMailSliceActions.allMailList(currentitem));
              if (currentitem.read === false) {
                count++;
                dispatch(allMailSliceActions.unreadMail(count))
              }
            });
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const recieveList = useSelector((state) => state.all.allmail);
  const newArray = recieveList.map((currentitem) => (
    <Link
      to={`/inbox/reciever/${RecieverEmail}/${currentitem.id}`}
      key={currentitem.id}
    >
      {" "}
      <div style={{ marginLeft: "40px" }}>
        {currentitem.read ? (
          ""
        ) : (
          <b style={{ color: "blue", fontSize: "50px" }}>.</b>
        )}
        <p
          style={{
            display: "inline-flex",
            margin: "0px 100px 0px 70px",
            width: "20rem",
          }}
        >
          {currentitem.recieverName}
        </p>
        <h4 style={{ display: "inline-flex", width: "50 rem" }}>
          {currentitem.subject}
        </h4>
        <hr></hr>
      </div>
    </Link>
  ));

  return <div>{newArray}</div>;
};
export default AllMail;
