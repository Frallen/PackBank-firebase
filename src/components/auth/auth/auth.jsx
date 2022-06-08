import React from "react";
import clas from "./auth.module.scss";
import { FormBox } from "./../form/common";

let Auth = (props) => {
  let auth = true;
  return (
    <div>
      <div className={clas.formbox}>
        <div className={clas.form}>
          <h4 className={clas.formboxtite}>Авторизация</h4>
          <FormBox
            NewUser={props.NewUser}
            {...props}
            AuthMe={props.AuthMe}
            auth={auth}
          ></FormBox>
        </div>
      </div>
    </div>
  );
};

export default Auth;
