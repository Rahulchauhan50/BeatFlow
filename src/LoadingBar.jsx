import React from "react";
import LoadingBar from "react-top-loading-bar";

const CustomLoadingBar = ({ progress }) => {
  return (
    <LoadingBar
      color="#0b7bf5"
      progress={progress}
    />
  );
};

export default CustomLoadingBar;
