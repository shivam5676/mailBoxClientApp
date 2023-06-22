import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { sentMailSliceActions } from "../store/mailRedux";

const DeleteEmail=(props)=>{
    const dispatch=useDispatch()
    const senderEmail=localStorage
    .getItem("user")
    .replace("@", "")
    .replace(".", "");
    const deleteEmailHandler=()=>{
        console.log(props)
        fetch(
            `https://mailboxclient-e8125-default-rtdb.firebaseio.com/sender/${senderEmail}/${props.id}.json`,
            {
              method: "DELETE",
            }
          ).then((res)=>{
            if(!res.ok)
            {
                throw new Error("email deletion failed")
            }
            else
            {
dispatch(sentMailSliceActions.deleteSentMail(props.id))
            }
          }).catch((err)=>{
            console.log(err)
          })
    }
    return(
        <Button onClick={deleteEmailHandler}>DElete</Button>
    )
}
export default DeleteEmail