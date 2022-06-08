import React from "react";
import { connect } from "react-redux";
import AdminAuth from "./AdminAuth";
import {AuthMeAdmin} from "./../../../redux/authReducer"

let AdminAuthCont = (props) => {

    let AuthMeAdmin=data=>{
        props.AuthMeAdmin(data)
    }

  return <AdminAuth AuthMeAdmin={AuthMeAdmin} {...props}></AdminAuth>;
};

let MapState = (state) => {
  return {
    loading:state.auth.loading
    
  };
};

export default connect(MapState, {AuthMeAdmin})(AdminAuthCont);
