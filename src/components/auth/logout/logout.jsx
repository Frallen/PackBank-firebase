import { useEffect } from "react";
import { connect } from "react-redux";
import { LogOut } from "./../../../redux/authReducer";

let Logout = (props) => {
  useEffect(() => {
    props.LogOut();
  }, []);

  return null;
};

let mapState = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapState, { LogOut })(Logout);
