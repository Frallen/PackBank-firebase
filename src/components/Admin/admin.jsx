import React, { useState } from "react";
import clas from "./admin.module.scss";
import { Menu } from "antd";
import {
  BankOutlined,
  CreditCardOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import BankForm from "./miniforms/bank.form";
import { NavLink } from "react-router-dom";
import DebetCardForm from "./miniforms/debetcard.form";
import CreditCardForm from "./miniforms/creditcard.form";
import CreateNews from "./miniforms/CreateNews";

//хз зачем хуйня антд
const { SubMenu } = Menu;

let Admin = (props) => {
  const [isShow, setShow] = useState(null);

  //Добавляю в useState число по которому определяю что рендерить
  let ShowsAPP = () => {
    switch (isShow) {
      case 1:
        return <BankForm {...props}></BankForm>;
      case 2:
        return <DebetCardForm {...props}></DebetCardForm>;
      case 3:
        return <CreditCardForm {...props}></CreditCardForm>;
      case 4:
        return <CreateNews {...props}></CreateNews>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className={clas.Main}>
      <Menu
        style={{ width: 224 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className={clas.block_Menu}
      >
        <Menu.ItemGroup key="a1">
          <Menu.Item key="a2">
            <NavLink to="/logout" className={clas.mainMenu__item}>
              Выйти
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>

        <SubMenu key="a3" icon={<BankOutlined />} title="Банки">
          <Menu.ItemGroup key="a4">
            <Menu.Item key="a5" onClick={() => setShow(1)}>
              Список банков
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="a6" icon={<CreditCardOutlined />} title="Карты">
          <Menu.ItemGroup key="a7" title="Дебетовые">
            <Menu.Item key="a8" onClick={() => setShow(2)}>
              Список дебетовых
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="a9" title="Кредитные">
            <Menu.Item key="a10" onClick={() => setShow(3)}>
              Список кредитных
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="a11" icon={<PaperClipOutlined />} title="Новости">
          <Menu.Item key="a12" onClick={() => setShow(4)}>
            Список новостей
          </Menu.Item>
        </SubMenu>
      </Menu>

      <div className={clas.tableBlock}>{ShowsAPP()}</div>
    </div>
  );
};

export default Admin;
