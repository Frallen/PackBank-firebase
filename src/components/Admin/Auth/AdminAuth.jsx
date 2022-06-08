import { LockOutlined } from "@ant-design/icons";
import { Input, Form, Button } from "antd";
import { useFormik } from "formik";
import React from "react";
import clas from "./../../auth/auth/auth.module.scss";

let AdminAuth = (props) => {
  const formik = useFormik({
    initialValues: {
      Password: "",
    },
    onSubmit: (values) => {
      props.AuthMeAdmin(values);
    },
  });

  return (
    <div>
      <div className={clas.formbox}>
        <div className={clas.form}>
          <h4 className={clas.formboxtite}>Admin panel</h4>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            onFinish={formik.handleSubmit}
          >
            <Form.Item
              rules={[{ required: true }]}
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
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={props.loading}
            >
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
