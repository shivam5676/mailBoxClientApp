import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sentMailSliceActions } from "../store/mailRedux";


const SentMailList = () => {
    const senderMail="techking08@gmail.com"
    const dispatch=useDispatch()
    useEffect(()=>{
        fetch(
            `https://mailboxclient-e8125-default-rtdb.firebaseio.com/
            ${senderMail
              .replace(".", "")
              .replace("@", "")}/sent.json`,
            {
              method: "GET",
              
            }
          )
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else throw new Error("mail sending error");
            })
            .then((response)=>{
                Object.values(response).map((current)=>dispatch(sentMailSliceActions.sentMailList(current)))
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])
  const sentmail = useSelector((state) => state.sentmail);
  const newArray=sentmail.map((currentItem)=>(
    <div key={Math.random()}>{currentItem.subject}</div>
  )
    
  )
  console.log(sentmail);
  return (
    <div>
      <h3>sender list</h3>
      <div>
        <h3>Name</h3>
      </div>
      <div>
        <h3>sent email list</h3>
      </div>
      {newArray}
    </div>
  );
};
export default SentMailList;
