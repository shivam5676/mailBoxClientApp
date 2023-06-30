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
  const newArray = recieveList.map((currentitem) => (
    // <Link
    //   to={`/inbox/reciever/${RecieverEmail}/${currentitem.id}`}
    //   key={currentitem.id}
    // >
    //   {" "}
    //   <div style={{ marginLeft: "40px" }}>
    //     {currentitem.read ? (
    //       ""
    //     ) : (
    //       <b style={{ color: "blue", fontSize: "35px" }}>.</b>
    //     )}
    //     <p
    //       style={{
    //         display: "inline-flex",
    //         margin: "0px 100px 0px 70px",
    //         // width: "20rem",
    //       }}
    //     >
    //       {currentitem.recieverName}
    //     </p>
    //     <h4 style={{ display: "inline-flex", width: "600 px" }}>
    //       {currentitem.subject}
    //     </h4>
    //     <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
    //       ({currentitem.sender})
    //     </p>
    //   </div>
    //   <hr></hr>
    // </Link>
    <div key={currentitem.id}>
      <Link to={`/inbox/reciever/${RecieverEmail}/${currentitem.id}`}>
        <div key={currentitem.id} style={{ marginLeft: "40px" }}>
          {currentitem.read ? (
            ""
          ) : (
            <b style={{ color: "blue", fontSize: "35px" }}>.</b>
          )}
          <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
            <b>{currentitem.senderName}</b>
          </p>
          <h4 style={{ display: "inline-flex", width: "600px" }}>
            {currentitem.subject}
          </h4>
          <p style={{ display: "inline-flex", margin: "0px 100px 0px 70px" }}>
            {currentitem.sender}
          </p>
        </div>
      </Link>{" "}
      {/* <DeleteEmail id={currentitem.id}></DeleteEmail> */}
      <hr></hr>
    </div>
  ));

  return <div>{newArray}</div>;
};
export default AllMail;
