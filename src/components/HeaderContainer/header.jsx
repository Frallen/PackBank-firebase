import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clas from "./header.module.scss";
import { Drawer, Col, Row } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
let Header = (props) => {
  const [isActive, setActive] = useState(false);
  let route = useLocation();
  //при переходе на другую страницу закрываю меню навигации
  useEffect(() => {
    setActive(false);
  }, [route]);
  return (
    <div className={clas.Main}>
      <NavLink to="/" className={clas.Logo}>
        Shape.ru
      </NavLink>

      <Drawer
        placement="top"
        closable={true}
        onClose={() => setActive(false)}
        visible={isActive}
        key="top"
        size="large"
      >
        <Col>
          <NavLink to="/" className={clas.Draweritem}>
            Главная
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/news" className={clas.Draweritem}>
            Новости
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/debit" className={clas.Draweritem}>
            Дебетовые карты
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/credit-card" className={clas.Draweritem}>
            Кредитные карты
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/zaim" className={clas.Draweritem}>
            Займы
          </NavLink>
        </Col>
        <Col>
          <NavLink to="/login" className={clas.Draweritem}>
            Войти
          </NavLink>
        </Col>
      </Drawer>
      <AppstoreOutlined
        onClick={() => setActive(true)}
        className={clas.iconButton}
      />
    </div>
  );
};

const AuthRoutesLinks = () => {
  return (
    <div>
      <NavLink to="/settings" className={clas.mainMenu__item}>
        Настройки
      </NavLink>
      <NavLink to="/logout" className={clas.mainMenu__item}>
        Выйти
      </NavLink>
    </div>
  );
};

export default Header;
