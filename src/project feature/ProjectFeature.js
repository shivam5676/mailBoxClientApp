import { current } from "@reduxjs/toolkit";
import { useState } from "react";
import navcss from "./projectfeature.module.css";
// import Sentimages from "../image/Sentimage.png"
const ProjectFeature = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const contentHandlerPLUS = () => {
    setCurrentContent(currentContent + 1);
  };
  const contentHandlerMinus = () => {
    setCurrentContent(currentContent - 1);
  };
  console.log(currentContent);
  let features;
  if (currentContent === 0) {
    features = (
      <div className={navcss.contentbox}>
        <p>DO YOU WANT TO EXPLORE FEATURES....!!</p>
        <p>IF YES... THEN CLICK ON LETS START</p>
        <button className={navcss.startbtn} onClick={contentHandlerPLUS}>
          LET`S START
        </button>
      </div>
    );
  }

  // if (currentContent == 1) {
  //   console.log("first executed");
  //   features = (
  //     <div style={{ boxShadow: "0px 0px 4px 7px black", marginTop: "10px" }}>
  //       <h1 style={{ textAlign: "center" }}>Project Features</h1>
  //       <hr></hr>
  //       <div
  //         style={{
  //           backgroundColor: "red",
  //           boxShadow: "10px 3px 12px black",
  //           marginTop: "20px",
  //           marginLeft: "10px",
  //           marginBottom: "10px",
  //           borderRadius: "10px",
  //           width: "50rem",
  //         }}
  //       >
  //         <p style={{ marginLeft: "5px" }}>
  //           <b>EACH SUCCESSFUL SENT EMAIL WILL BE STORED IN SENT MAIL</b>
  //         </p>
  //         <p style={{ marginLeft: "5px" }}>
  //           <b>EACH UNREAD EMAIL WILL BE SHOWN A BLUE SHADOW WITH BLUE DOT</b>
  //         </p>

  //         <p style={{ marginLeft: "5px", marginBottom: "20px" }}>
  //           <b>YOU CAN DELETE SENT MAIL BY CLICKING ON DELETE BUTTON</b>
  //         </p>
  //       </div>

  //       <img src="image/image-1.png"></img>
  //     </div>
  //   );
  // }
  // if (currentContent == 2) {
  //   console.log("second executed");
  //   features = (
  //     <div
  //       style={{
  //         boxShadow: "0px 0px 4px 7px black",
  //         marginTop: "10px",
  //         paddingRight: "120px",
  //       }}
  //     >
  //       <h1 style={{ textAlign: "center" }}>Project Features</h1>
  //       <hr></hr>
  //       <div
  //         style={{
  //           backgroundColor: "yellow",
  //           boxShadow: "10px 3px 12px black",
  //           marginTop: "20px",
  //           marginLeft: "10px",
  //           marginBottom: "10px",
  //           borderRadius: "10px",
  //           width: "50rem",
  //         }}
  //       >
  //         <p style={{ marginLeft: "5px" }}>
  //           <b>EACH READ MAIL WILL BE SHOWN GREEN SHADOW </b>
  //         </p>
  //         <p style={{ marginLeft: "5px" }}>
  //           <b>WHEN U CLICK ON MAIL AFTER THAT BLUE DOT WILL BE INVISIBLE</b>
  //         </p>
  //         <p style={{ marginLeft: "5px" }}>
  //           <b></b>
  //         </p>
  //       </div>

  //       <img src="image/image-2.png"></img>
  //     </div>
  //   );
  // }
  // if (currentContent == 3) {
  //   features = (
  //     <div
  //       style={{
  //         boxShadow: "0px 0px 4px 7px black",
  //         marginTop: "10px",
  //         paddingRight: "120px",
  //       }}
  //     >
  //       <h1 style={{ textAlign: "center" }}>Project Features</h1>
  //       <hr></hr>
  //       <div
  //         style={{
  //           backgroundColor: "yellow",
  //           boxShadow: "10px 3px 12px black",
  //           marginTop: "20px",
  //           marginLeft: "10px",
  //           marginBottom: "10px",
  //           borderRadius: "10px",
  //           width: "50rem",
  //         }}
  //       ></div>

  //       <img src="image/image-3.png" style={{ width: "70rem" }}></img>
  //     </div>
  //   );
  // }
  // if (currentContent == 4) {
  //   console.log("first executed");
  //   features = (
  //     <div style={{ boxShadow: "0px 0px 4px 7px black", marginTop: "10px" }}>
  //       <h1 style={{ textAlign: "center" }}>Project Features</h1>
  //       <hr></hr>
  //       <div
  //         style={{
  //           backgroundColor: "yellow",
  //           boxShadow: "10px 3px 12px black",
  //           marginTop: "20px",
  //           marginLeft: "10px",
  //           marginBottom: "30px",
  //           borderRadius: "10px",
  //           width: "76rem",
  //         }}
  //       >
  //         <h3 style={{ marginLeft: "5px" }}>
  //           <b>These are some features ,On which this web App will work</b>
  //         </h3>
  //         <hr></hr>
  //         <p style={{ marginLeft: "5px" }}>
  //           <b>
  //             IF ANY FEATURES ARE NOT WORKING OR YOU FIND ANY ERROR OR YOU HAVE
  //             ANY FEEDBACK FOR ME,THEN GO TO CONTACT US PAGE AND SEND US A
  //             MESSAGE{" "}
  //           </b>
  //         </p>
  //         <hr></hr>
  //       </div>
  //       <img src="image/image-4.png" style={{ width: "60rem" }}></img>
  //     </div>
  //   );
  // }

  return (
    <div className={navcss.containers}>
      <div className={navcss.contentbox}>
        <p>DO YOU WANT TO EXPLORE FEATURES....!!</p>
        <p>IF YES... THEN CLICK ON LETS START</p>

        <div className={navcss.buttonContainer}>
        <div className={navcss.backwardContainer}>
          <button className={navcss.backwardbtn} onClick={contentHandlerMinus}>{"<"}</button>
        </div>
        <div className={navcss.forwardContainer}>
          <button className={navcss.forwardbtn} onClick={contentHandlerPLUS}>{">"}</button>
        </div>
      </div>
      </div>
    </div>
    // <div>
    //   {features}
    //   <div style={{ display: "inline-flex" }}>
    //     {" "}
    //     {currentContent > 1 ? (
    //       <div style={{ textAlign: "left", marginRight: "48rem" }}>
    //         <button
    //           onClick={contentHandlerMinus}
    //           style={{
    //             backgroundColor: "aqua",
    //             boxShadow: "0px 0px 10px 3px",
    //             marginTop: "20px",
    //             borderRadius: "12px",
    //           }}
    //         >
    //           <b>EXPLORE PREVIOUS FEATURES</b>
    //         </button>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //     {currentContent < 4&&currentContent>0 ? (
    //       <div style={{ textAlign: "right" }}>
    //         <button
    //           onClick={contentHandlerPLUS}
    //           style={{
    //             backgroundColor: "aqua",
    //             boxShadow: "0px 0px 10px 3px",
    //             marginTop: "20px",
    //             borderRadius: "12px",
    //             textAlign: "right",
    //             // marginLeft: "62rem",
    //           }}
    //         >
    //           <b>EXPLORE NEXT FEATURES</b>
    //         </button>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>
  );
};
export default ProjectFeature;
