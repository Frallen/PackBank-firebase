import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Space,
  Table,
  Modal,
  message,
} from "antd";
import * as Yup from "yup";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import clas from "./../admin.module.scss";
//антд

const BankForm = (props) => {
  const { confirm } = Modal;
  //Уведомления
  useEffect(() => {
    if (props.status === 201) {
      message.success("Операция выполнена успешно");
    }
    if (props.status === 500) {
      message.error("Что-то пошло не так");
    }

    if (props.status === 400) {
      message.error("Банк с такой лицензией уже сущесвует");
    }
    //чищу стейт
    props.Clear();
  }, [props.status]);

  const [form] = Form.useForm();
  //стейт скрыть и показывать форму
  const [isShowBank, setShowBank1] = useState(false);
  const [idbank, setUpdId] = useState(null);
  //валидация полей лицензии и номера телефона
  const BankShema = Yup.object().shape({
    name_bank: Yup.string().required("Это обязательное поле"),
    url: Yup.string().required("Это обязательное поле"),
    license: Yup.number()
      .typeError("Только цифры")
      .required("Это обязательное поле"),

    phone_number: Yup.number()
      .typeError("Только цифры")
      .required("Это обязательное поле"),
    url_images: Yup.string().required("Это обязательное поле"),
    About: Yup.string().required("Это обязательное поле"),
  });
  //отдельная валидация на сравнение лицензий
  const validate = (values) => {
    const errors = {};
    //разложить массив до объекта и привести в строку тк пришедшие номера лицензий Numbers like int
    let checklicense = props.data.map((p) => p.license.toString());
    //Проверяю введенную лицензию на совпадение с сущесвующими
    let ismatch = checklicense.includes(values.license);

    if (!idbank && ismatch) {
      errors.license = "Банк с такой лицензией уже существует";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name_bank: "",
      url: "",
      license: "",
      phone_number: "",
      url_images: "",
      About: "",
    },
    validate,
    validationSchema: BankShema,
    onSubmit: (values) => {
      values.idbank = idbank;
      //отправляю данные на серв
      idbank ? props.UpadteBank(values) : props.CreateBank(values);
      setUpdId(null);
      //закрываю форму
      setShowBank1(false);

      form.resetFields();
    },
  });

  //колонки таблицы
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",

      responsive: ["lg"],
    },
    {
      title: "Название банка",
      dataIndex: "name_bank",
      key: "name_bank",
      responsive: ["lg"],
    },
    {
      title: "№ лицензии",
      dataIndex: "license",
      key: "license",
      responsive: ["lg"],
    },
    {
      title: "Ссылка на банк",
      dataIndex: "url",
      key: "url",
      responsive: ["lg"],
    },
    {
      title: "Номера телефонов",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["lg"],
    },
    {
      title: "Действие",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="small">
          <a onClick={() => ChangeBank(record)}> Изменить</a>
          <a onClick={() => showDeleteConfirm(text._id)}>Удалить</a>
        </Space>
      ),
    },
  ];

  let ChangeBank = (record) => {
    setShowBank1(true);
    setUpdId(record._id);
    formik.setFieldValue("name_bank", record.name_bank);
    formik.setFieldValue("url", record.url);
    formik.setFieldValue("license", record.license);
    formik.setFieldValue("phone_number", record.phone_number);
    formik.setFieldValue("url_images", record.url_images);
    formik.setFieldValue("About", record.About);
  };
  let showDeleteConfirm = (id) => {
    confirm({
      title: "Вы хотите удалить банк?",
      icon: <ExclamationCircleOutlined />,
      content: "Все данные о банке, продукты будут удаленны",
      okText: "Подвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        props.DeleteBank(id);
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div className={clas.tableBlock_header}>
        <h3>Список банков</h3>
        <Button
          type="primary"
          onClick={() => setShowBank1(true)}
          icon={<PlusOutlined />}
          className={clas.addbtn}
        >
          Добавить банк
        </Button>
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={props.data}
        className={clas.Table}
      ></Table>

      <Drawer
        title="Добавить новый банк"
        width={720}
        onClose={() => setShowBank1(false)}
        visible={isShowBank}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setShowBank1(false)}>Отменить</Button>
            <Button type="primary">Добавить банк</Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          hideRequiredMark
          onFinish={formik.handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Название банка"
                validateStatus={formik.errors.name_bank && "error"}
                help={formik.errors.name_bank}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name_bank}
                  name="name_bank"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ссылка на сайт банка"
                validateStatus={formik.errors.url && "error"}
                help={formik.errors.url}
              >
                <Input
                  style={{ width: "100%" }}
                  name="url"
                  onChange={formik.handleChange}
                  value={formik.values.url}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Номер лицензии банка"
                validateStatus={formik.errors.license && "error"}
                help={formik.errors.license}
              >
                <Input
                  style={{ width: "100%" }}
                  name="license"
                  onChange={formik.handleChange}
                  value={formik.values.license}
                  maxLength="9"
                  minLength="9"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Телефон банка(общий)"
                type="tel"
                rules={[{ required: true, message: "Введите телефон банка" }]}
                validateStatus={formik.errors.phone_number && "error"}
                help={formik.errors.phone_number}
              >
                <Input
                  addonBefore={"+"}
                  style={{ width: "100%" }}
                  minLength="11"
                  maxLength="11"
                  name="phone_number"
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ссылка на логотип банка"
                validateStatus={formik.errors.url_images && "error"}
                help={formik.errors.url_images}
              >
                <Input
                  name="url_images"
                  onChange={formik.handleChange}
                  value={formik.values.url_images}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Описание банка"
                validateStatus={formik.errors.About && "error"}
                help={formik.errors.About}
              >
                <Input.TextArea
                  showCount
                  maxLength={200}
                  name="About"
                  onChange={formik.handleChange}
                  value={formik.values.About}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={props.loading}
              >
                Добавить банк
              </Button>
            </Col>
            <Col span={12}>
              <Button block onClick={() => setShowBank1(false)}>
                Отменить
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default BankForm;
