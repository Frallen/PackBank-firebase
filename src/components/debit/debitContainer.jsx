import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Debit from "./debit";
import {
  GetDebetCards,
  GetBank,
  CleanAllData,
} from "./../../redux/MainReducer";
import { Space, Spin } from "antd";
import clas from "./debit.module.scss";

let DebitCont = (props) => {
  const [succ] = useState(props.succ === true ? true : false);

  useEffect(() => {
    //
    props.CleanAllData();
    props.GetBank();
    props.GetDebetCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.data && props.dataDebet ? (
    <Debit {...props}></Debit>
  ) : (
    <Space size="middle" className={clas.Preloader}>
      <Spin size="large" />
    </Space>
  );
};

let mapProps = (state) => {
  return {
    data: state.main.data,
    dataDebet: state.main.dataDebet,
    succ: state.main.succ,
    loading: state.main.loading,
  };
};

export default compose(
  connect(mapProps, { GetDebetCards, GetBank, CleanAllData })
)(DebitCont);
