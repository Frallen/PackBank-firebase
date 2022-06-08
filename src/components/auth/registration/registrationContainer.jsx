import React, { useEffect } from "react";
import { connect } from "react-redux";
import Reg from "./registration";
import { NewUser, ClearUp } from "./../../../redux/authReducer";

const RegCont = (props) => {
   useEffect(() => {
     props.ClearUp();
  },[]);

  let NewUser = (data) => {
    props.NewUser(data);
  };

  return <Reg {...props} NewUser={NewUser}></Reg>;
};

let mapState = (state) => {
  return {
    succ: state.auth.succ,
    loading: state.auth.loading,
    error:state.auth.error
  };
};

export default connect(mapState, { NewUser, ClearUp })(RegCont);
