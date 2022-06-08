import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Header from "./header";

let HeaderContainer = (props) => {
  return <Header {...props}></Header>;
};

let mapStateTOProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default compose(connect(mapStateTOProps, {}))(HeaderContainer);
