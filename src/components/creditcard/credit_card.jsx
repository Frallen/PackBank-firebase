import { Button, Checkbox, Col, Row, Select } from "antd";
import React from "react";
import clas from "./credit_card.module.scss";
import { Collapse } from "antd";

import { Form } from "antd";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

let Credit_card = (props) => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;
  const formik = useFormik({
    initialValues: {
      id_bank: "",
      name_bank: "",
      name_card: "",
      srok: "",
      About: "",
      pay_system: "",
      sms_pay: "",
      cash: "",
      stavka: "",
      limit: "",
      dayzToPay: "",
      osblug_pay: "",
      url_images: "",
    },
    onSubmit: (values) => {
      //ищу в банках совпадение по айди
      let bank = props.dataCreditCard.filter(
        (p) => p.id_bank === values.id_bank
      );
      //беру название банка
      let name_bank = bank.map((p) => p.name_bank);
      //задаю в элемент
      values.name_bank = name_bank[0];
    },
  });
  //массив платежных систем
  const systems = [
    { type: "Visa" },
    { type: "MasterCard" },
    { type: "Мир" },
    { type: "Maestro" },
  ];

  const { Option } = Select;
  return (
    <div className={clas.Main}>
      <Collapse accordion>
        <Panel header="Поиск" key="1">
          <Form
            className={clas.Filters}
            form={form}
            layout="horizontal"
            onFinish={formik.handleSubmit}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Банки">
                  <Select
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
            </Row>
            <Row gutter={24}>
              <Col span={24}>
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
            <Row gutter={24}>
              <Form.Item>
                <Checkbox onChange={formik.values.cashback}>Кешбек</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={formik.values.sms_pay}>
                  Бесплатное sms обслуживание
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Checkbox onChange={formik.values.osblug_pay}>
                  Бесплатное обслуживание карты
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={formik.values.cash}>
                  Для снятия наличных
                </Checkbox>
              </Form.Item>
            </Row>
            <Row gutter={16}>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={props.loading}
              >
                Добавить банк
              </Button>
            </Row>
          </Form>
        </Panel>
      </Collapse>
      <div className={clas.card_block}>
        {props.dataCreditCard.map((i) => (
          <div className={clas.card} key={i._id}>
            <div className={clas.card_img}>
              <img src={i.url_images} alt="" />
            </div>
            <div className={clas.card_info}>
              <ul className={clas.card_info_atribut}>
                <h3>{i.name_card}</h3>
                <li className={clas.card_info_atribut_item}>
                  Банк:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.name_bank}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Срок выпуска:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.srok + " лет"}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Платежная система:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.pay_system}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Для снятия наличных:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.cash === true ? "Да" : "Нет"}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Ставка по карте:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.stavka + "%"}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Лимит:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.limit}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Льготный период:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.dayzToPay + "дней"}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Плата за смс:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.sms_pay === "Нет" ? "Нет" : i.sms_pay + " в мес"}
                  </span>
                </li>
                <li className={clas.card_info_atribut_item}>
                  Плата за обслуживание:
                  <span className={clas.card_info_atribut_item_spec}>
                    {i.osblug_pay === "Нет" ? "Нет" : i.osblug_pay + " в мес."}
                  </span>
                </li>
              </ul>
              <NavLink to={`/debit/${i._id}`} className={clas.showMore}>
                Подробнее
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credit_card;
