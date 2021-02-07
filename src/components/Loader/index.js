import React from "react";
import { textAlign } from "styled-system";
import loader from ".././../assets/image/loading.gif";

import Loader from "react-loader-spinner";

const index = () => {
  const styles = {
    loaderDiv: {
      height: "100%",
      width: "100%",
      position: "fixed",
      textAlign: "center",
      zIndex: "1000",
      backgroundColor:"rgb(6 7 5 / 16%)"
    },
    loader:{
        width: "100%",
        margin:"auto",
        position: "fixed",
        top: "50%"
    }
  };
  return (
    <div style={styles.loaderDiv}>
      <Loader style={styles.loader} type="TailSpin" color="#00b074" height={100} width={100} />
    </div>
  );
};

export default index;

 