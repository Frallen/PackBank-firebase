import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Creditcard from "./credit_card";
import { GetCreditCards, GetBank, CleanAllData } from "./../../redux/MainReducer";
import { Space, Spin } from "antd";
import clas from "./credit_card.module.scss";

let CreditCardCont = (props) => {
  const [succ] = useState(props.succ === true ? true : false);

  useEffect(() => {
    //
    props.CleanAllData();
    props.GetBank();
    props.GetCreditCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.data && props.dataCreditCard ? (
    <Creditcard {...props}></Creditcard>
  ) : (
    <Space size="middle" className={clas.Preloader}>
      <Spin size="large" />
    </Space>
  );
};

let mapProps = (state) => {
  return {
    data: state.main.data,
    dataCreditCard: state.main.dataCreditCard,
    succ: state.main.succ,
    loading: state.main.loading,
  };
};

export default compose(
  connect(mapProps, { GetCreditCards, GetBank, CleanAllData })
)(CreditCardCont);
