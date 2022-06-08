import React from "react";
import clas from "./../auth/auth.module.scss";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import { useLocation } from "react-router-dom";

export const FormBox = (props) => {
  let location = useLocation();
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      location.pathname === "/registration"
        ? props.NewUser(values)
        : props.AuthMe(values);
    },
  });

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 20 }}
      onFinish={formik.handleSubmit}
    >
      <Form.Item
        name="Email"
        rules={[{ required: true, message: "Введите почту" }]}
        label="Почта"
      >
        <Input
          id="Email"
          type="email"
          name="Email"
          onChange={formik.handleChange}
          value={formik.values.Email}
          className={clas.itemForm}
          prefix={<UserOutlined />}
        ></Input>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, min: 6, message: "Пароль больше 6 символов" }]}
        name="Password"
        label="Пароль"
      >
        <Input.Password
          id="Password"
          type="password"
          name="Password"
          onChange={formik.handleChange}
          value={formik.values.Password}
          className={clas.itemForm}
          prefix={<LockOutlined />}
        ></Input.Password>
      </Form.Item>

      <Button type="primary" htmlType="submit" block disabled={props.loading}>
        {props.auth ? "Войти" : "Зарегистрироваться"}
      </Button>
      {props.auth && <NavLink to="/registration">Зарегистрироваться</NavLink>}
    </Form>
  );
};
