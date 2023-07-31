import { useDispatch, useSelector } from "react-redux";
import { allMailSliceActions } from "../store/mailRedux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import navcss from "./Allmail.module.css";

const AllMail = () => {
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD1Zg5nW23hWuRY7a1UXWyDPxGGleq3_SM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            "data not updated yet.check interner connection or try again later"
          );
        }
      })
      .then((response) => {
        localStorage.setItem("username", response.users[0].displayName);
        localStorage.setItem("user", response.users[0].email);
        // setuserName(localStorage.getItem("username"))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        <div className={navcss.maillist}>
          <div className={navcss.readstatus}>o</div>
          <div className={navcss.sender}>
            <p className={navcss.sendername}>{currentitem.senderName}</p>
            <div className={navcss.sendermsg}>{currentitem.subject}</div>
          </div>
        </div>
      </Link>
    </div>
  ));
  if (recieveList.length == "0") {
    newArray = <h3>inbox is empty</h3>;
  }

  return <div className={navcss.maincontent}>{newArray}</div>;
};
export default AllMail;
