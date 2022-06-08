import { Button, Result, message } from "antd";
import React from "react";
import clas from "./../auth/auth.module.scss";
import { NavLink } from "react-router-dom";
import { FormBox } from "./../form/common";

let Reg = (props) => {
  props.error === "Такой пользователь уже зарегистрирован" &&
    message.error(props.error);

  return (
    <div>
      {props.succ ? (
        <Result
          key="1"
          status="success"
          title="Аккаунт успешно создан"
          subTitle="Нажмите кнопку продолжить перейти к авторизации"
          extra={[
            <NavLink to="/auth">
              <Button type="primary" key="console">
                Продолжить
              </Button>
            </NavLink>,
          ]}
        />
      ) : (
        <div className={clas.formbox}>
          <div className={clas.form}>
            <h4 className={clas.formboxtite}>Регистрация</h4>
            <FormBox NewUser={props.NewUser} {...props}></FormBox>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reg;
