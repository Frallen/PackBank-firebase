import React, { useEffect, useState } from "react";
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
  Select,
  message,
} from "antd";
import * as Yup from "yup";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import clas from "./../admin.module.scss";
//антд
const { confirm } = Modal;
const { Option } = Select;

const DebetCardForm = (props) => {
  //Уведомления
  useEffect(() => {
    if (props.status === 201) {
      message.success("Операция выполнена успешно");
    }
    if (props.status === 500) {
      message.error("Что-то пошло не так");
    }

    if (props.status === 404) {
      message.error("Такого банка не сущесвует");
    }
    //чищу стейт
    props.Clear();
  }, [props.status]);

  const [form] = Form.useForm();
  //стейт скрыть и показывать форму
  const [isShowBank, setShowBank1] = useState(false);
  const [idbank, setUpdId] = useState("");

  //валидация полей лиценции и номера телефона
  const DebetShema = Yup.object().shape({
    id_bank: Yup.string().required("Это обязательное поле"),
    name_card: Yup.string().required("Это обязательное поле"),
    pay_system: Yup.string().required("Это обязательное поле"),
    url_images: Yup.string().required("Это обязательное поле"),
    srok: Yup.number()
      .typeError("Только цифры")
      .required("Это обязательное поле"),
  });

  //массив платежных систем
  const systems = [
    { type: "Visa" },
    { type: "MasterCard" },
    { type: "Мир" },
    { type: "Maestro" },
  ];

  //колонки таблицы
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",

      responsive: ["lg"],
    },
    {
      title: "Принадлежит",
      dataIndex: "name_bank",
      key: "name_bank",
      responsive: ["lg"],
    },
    {
      title: "Название карты",
      dataIndex: "name_card",
      key: "name_card",
      responsive: ["lg"],
    },
    {
      title: "Срок действия",
      dataIndex: "srok",
      key: "srok",
      responsive: ["sm"],
    },
    {
      title: "Платежные системы",
      dataIndex: "pay_system",
      key: "pay_system",
      responsive: ["sm"],
    },
    {
      title: "Плата за смс",
      dataIndex: "sms_pay",
      key: "sms_pay",
      responsive: ["sm"],
    },
    {
      title: "Процент на остаток",
      dataIndex: "ostatok",
      key: "ostatok",
      responsive: ["sm"],
    },
    {
      title: "Процент кешбека",
      dataIndex: "cashback",
      key: "cashback",
      responsive: ["sm"],
    },
    {
      title: "Плата за обслуживание",
      dataIndex: "osblug_pay",
      key: "osblug_pay",
      responsive: ["sm"],
    },
    {
      title: "Изображения",
      dataIndex: "url_images",
      key: "url_images",
      render: url_images => <img width={100} src={url_images}></img>,
      responsive: ["sm"],
    },
    {
      title: "Действие",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => ChangeBank(record)}> Изменить</a>
          <a onClick={() => showDeleteConfirm(text._id)}>Удалить</a>
        </Space>
      ),
    },
  ];

  let showDeleteConfirm = (id) => {
    confirm({
      title: "Вы хотите удалить карту?",
      icon: <ExclamationCircleOutlined />,
      content: "Все данные о карте будут удаленны",
      okText: "Подвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        props.DeleteDebet(id);
      },
      onCancel() {},
    });
  };

  const formik = useFormik({
    initialValues: {
      id_bank: "",
      name_bank: "",
      name_card: "",
      srok: "",
      pay_system: "",
      url_images: "",
      sms_pay: "",
      ostatok: "",
      cashback: "",
      osblug_pay: "",
    },
    //валидация yup
    validationSchema: DebetShema,
    onSubmit: (values) => {
      //ищу в банках совпадение по айди
      let bank = props.data.filter((p) => p._id === values.id_bank);
      //беру название банка
      let name_bank = bank.map((p) => p.name_bank);
      //задаю в элемент
      values.name_bank = name_bank[0];
      //отправляю данные на серв
      if (!values.osblug_pay) {
        values.osblug_pay = "Нет";
      }
      if (!values.cashback) {
        values.cashback = "Нет";
      }
      if (!values.ostatok) {
        values.ostatok = "Нет";
      }
      if (!values.sms_pay) {
        values.sms_pay = "Нет";
      }

      values.id = idbank;
      //отправляю данные на серв
      idbank ? props.UpdateDebetCard(values) : props.CreateDebetCard(values);
      setUpdId(null);
      //закрываю форму
      setShowBank1(false);

      //закрываю форму
      setShowBank1(false);
      form.resetFields();
    },
  });

  let ChangeBank = (record) => {
    setShowBank1(true);
    setUpdId(record._id);
    formik.setFieldValue("id_bank", record.id_bank);
    formik.setFieldValue("name_bank", record.name_bank);
    formik.setFieldValue("name_card", record.name_card);
    formik.setFieldValue("srok", record.srok);
    formik.setFieldValue("pay_system", record.pay_system);
    formik.setFieldValue("sms_pay", record.sms_pay);
    formik.setFieldValue("ostatok", record.ostatok);
    formik.setFieldValue("cashback", record.cashback);
    formik.setFieldValue("url_images", record.url_images);
    formik.setFieldValue("osblug_pay", record.osblug_pay);
  };

  return (
    <div>
      <div className={clas.tableBlock_header}>
        <h3>Список дебетовых карт карт</h3>
        <Button
          type="primary"
          onClick={() => setShowBank1(true)}
          icon={<PlusOutlined />}
          className={clas.addbtn}
        >
          Добавить дебетовую карту
        </Button>
      </div>
      <Table
        size="large"
        columns={columns}
        dataSource={props.dataDebet}
        className={clas.Table}
      ></Table>

      <Drawer
        title="Добавить новую дебетовую карту"
        width={720}
        onClose={() => setShowBank1(false)}
        visible={isShowBank}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setShowBank1(false)}>Отменить</Button>
            <Button type="primary">Добавить карту</Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={formik.handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Название банка"
                validateStatus={formik.errors.id_bank && "error"}
                help={formik.errors.id_bank}
              >
                <Select
                  // onChange={formik.handleChange}
                  value={formik.values.id_bank}
                  onChange={(value) => {
                    formik.setFieldValue("id_bank", value);
                  }}
                  onSelect={formik.handleChange}
                >
                  {
                    //беру данные об банках,а именно id и название банка и пихаю в селект
                    props.data &&
                      props.data.map((p, index) => (
                        <Option key={index} value={p._id}>
                          {p.name_bank}
                        </Option>
                      ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Название карты"
                validateStatus={formik.errors.name_card && "error"}
                help={formik.errors.name_card}
              >
                <Input
                  style={{ width: "100%" }}
                  name="name_card"
                  onChange={formik.handleChange}
                  value={formik.values.name_card}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Срок действия карты"
                validateStatus={formik.errors.srok && "error"}
                help={formik.errors.srok}
              >
                <Input
                  style={{ width: "100%" }}
                  name="srok"
                  onChange={formik.handleChange}
                  value={formik.values.srok}
                  maxLength="1"
                  minLength="1"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Платежная система"
                validateStatus={formik.errors.pay_system && "error"}
                help={formik.errors.pay_system}
              >
                <Select
                  onChange={(value) => {
                    formik.setFieldValue("pay_system", value);
                  }}
                  value={formik.values.pay_system}
                >
                  {systems.map((p, index) => (
                    <Select.Option key={index} value={p.type}>
                      {p.type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ссылка на изображение карты"
                validateStatus={formik.errors.url_images && "error"}
                help={formik.errors.url_images}
              >
                <Input
                  placeholder="Ссылка "
                  name="url_images"
                  onChange={formik.handleChange}
                  value={formik.values.url_images}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Плата за смс">
                <Input
                  name="sms_pay"
                  onChange={formik.handleChange}
                  value={formik.values.sms_pay}
                  addonAfter="в/мес"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Введите процент на остаток ">
                <Input
                  name="ostatok"
                  onChange={formik.handleChange}
                  value={formik.values.ostatok}
                  addonAfter="в/мес"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Процент кешбека(если есть)">
                <Input
                  name="cashback"
                  onChange={formik.handleChange}
                  value={formik.values.cashback}
                  addonAfter="в/мес"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Введите плату сумму за обслуживание ">
                <Input
                  name="osblug_pay"
                  onChange={formik.handleChange}
                  value={formik.values.osblug_pay}
                  addonAfter="в/мес"
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

export default DebetCardForm;
