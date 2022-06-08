import {
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Table,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import clas from "./../admin.module.scss";

let CreateNews = (props) => {
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
  const NewsSchema = Yup.object()
    .shape({
      Title: Yup.string().required("Это обязательное поле"),
      Date: Yup.string().required("Это обязательное поле"),
      title_image: Yup.string().required("Это обязательное поле"),
      Text: Yup.string().required("Это обязательное поле"),
    })
  //отдельная валидация на сравнение лицензий
  const validate = (values) => {
    const errors = {};

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      Title: "",
      Date: "",
      title_image: "",
      Text: "",
    },

    validate,
    validationSchema: NewsSchema,
    onSubmit: (values) => {
      values._id = idbank;
      //отправляю данные на серв
      idbank ? props.UpdateNews(values) : props.CreateNews(values);
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
      fixed: "left",
      responsive: ["lg"],
    },
    {
      title: "Название новости",
      dataIndex: "Title",
      key: "Title",
      responsive: ["lg"],
    },
    {
      title: "Дата публикации",
      dataIndex: "Date",
      key: "Date",
      responsive: ["lg"],
    },
    {
      title: "Изображение статьи",
      dataIndex: "title_image",
      key: "title_image",
      width: 100,
      height:100,
      render: (title_image) => <img src={title_image}></img>,
    },
    {
      title: "Текст новости",
      dataIndex: "Text",
      key: "Text",
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
    formik.setFieldValue("Title", record.Title);
    formik.setFieldValue("Date", record.Date);
    formik.setFieldValue("title_image", record.title_image);
    formik.setFieldValue("Text", record.Text);
  };
  let showDeleteConfirm = (id) => {
    confirm({
      title: "Вы хотите удалить новость?",
      icon: <ExclamationCircleOutlined />,
      content: "Данна новость будет удалена навсегда",
      okText: "Подвердить",
      okType: "danger",
      cancelText: "Отменить",
      onOk() {
        props.DeleteNews(id);
      },
      onCancel() {},
    });
  };
  return (
    <div>
      <div className={clas.tableBlock_header}>
        <h3>Список новостей</h3>
        <Button
          type="primary"
          onClick={() => setShowBank1(true)}
          icon={<PlusOutlined />}
          className={clas.addbtn}
        >
          Добавить новость
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={props.DataNews}
        className={clas.Table}
      ></Table>
      <Drawer
        title="Добавить новость"
        width={720}
        onClose={() => setShowBank1(false)}
        visible={isShowBank}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setShowBank1(false)}>Отменить</Button>
            <Button type="primary">Добавить новость</Button>
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
                label="Название новости"
                validateStatus={formik.errors.Title && "error"}
                help={formik.errors.Title}
              >
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.Title}
                  name="Title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Дата публикации"
                validateStatus={formik.errors.Date && "error"}
                help={formik.errors.Date}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  name="Date"
                  onChange={(date, dateString) =>
                    formik.setFieldValue("Date", dateString)
                  }
                  value={
                    formik.values.Date !== ""
                      ? moment(formik.values.Date)
                      : null
                  }
                  format="MM-DD-YYYY"
                ></DatePicker>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ссылка на изображение статьи"
                validateStatus={formik.errors.title_image && "error"}
                help={formik.errors.title_image}
              >
                <Input
                  placeholder="Ссылка "
                  name="title_image"
                  onChange={formik.handleChange}
                  value={formik.values.title_image}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Текст новости"
                validateStatus={formik.errors.Text && "error"}
                help={formik.errors.Text}
              >
                <Input.TextArea
                  showCount
                  maxLength={200}
                  name="Text"
                  onChange={formik.handleChange}
                  value={formik.values.Text}
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
                Добавить новость
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

export default CreateNews;
