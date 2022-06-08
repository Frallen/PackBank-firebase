import React, { useEffect } from "react";
import { connect } from "react-redux";
import Auth from "./auth";
import { AuthMe, ClearUp } from "./../../../redux/authReducer";

const AuthCont = (props) => {
  useEffect(() => {
    props.ClearUp();
  }, []);

  let AuthMe = (data) => {
    props.AuthMe(data);
  };

  return <Auth {...props} AuthMe={AuthMe}></Auth>;
};

let mapState = (state) => {
  return {};
};

export default connect(mapState, { AuthMe, ClearUp })(AuthCont);
