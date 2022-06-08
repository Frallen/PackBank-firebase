import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Admin from "./admin";
import {
  CreateBank,
  CreateCreditCard,
  GetBank,
  GetCreditCards,
  UpdateCreditCard,
  DeleteCreditCard,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
  DeleteDebet,
  UpadteBank,
  UpdateDebetCard,
  GetNews,
  CreateNews,
  UpdateNews,
  DeleteNews,
  Clear,
} from "./../../redux/adminReducer";

const AdminCont = (props) => {
  const [succ] = useState(props.succ === true ? true : false);
  useEffect(() => {
    //
    props.GetBank();
    props.GetDebetCards();
    props.GetCreditCards();
    props.GetNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succ]);

  let CreateBank = (data) => {
    //создать банк
    props.CreateBank(data);
  };

  let UpadteBank = (data) => {
    //обновляю банк
    props.UpadteBank(data);
  };
  let DeleteBank = (id) => {
    //удалить банк
    props.DeleteBank(id);
  };
  let CreateDebetCard = (data) => {
    //создать дебетовую карту
    props.CreateDebetCard(data);
  };
  let UpdateDebetCard = (data) => {
    props.UpdateDebetCard(data);
  };
  let DeleteDebet = (id) => {
    //удалить дебетовую карту
    props.DeleteDebet(id);
  };

  let CreateCreditCard = (data) => {
    //создать кредитную карту
    props.CreateCreditCard(data);
  };
  let UpdateCreditCard = (data) => {
    //обновить кредитную карту
    props.UpdateCreditCard(data);
  };
  let DeleteCreditCard = (data) => {
    //удалить кредитную карту
    props.DeleteCreditCard(data);
  };

  let CreateNews = (data) => {
    //создать кредитную карту
    props.CreateNews(data);
  };
  let UpdateNews = (data) => {
    //обновить кредитную карту
    props.UpdateNews(data);
  };
  let DeleteNews = (data) => {
    //удалить кредитную карту
    props.DeleteNews(data);
  };

  //очистить state
  let Clear = () => {
    props.Clear();
  };
  return (
    <Admin
      CreateNews={CreateNews}
      UpdateNews={UpdateNews}
      DeleteNews={DeleteNews}
      CreateCreditCard={CreateCreditCard}
      UpdateCreditCard={UpdateCreditCard}
      DeleteCreditCard={DeleteCreditCard}
      CreateBank={CreateBank}
      UpadteBank={UpadteBank}
      DeleteBank={DeleteBank}
      CreateDebetCard={CreateDebetCard}
      UpdateDebetCard={UpdateDebetCard}
      DeleteDebet={DeleteDebet}
      Clear={Clear}
      {...props}
    ></Admin>
  );
};

let MapState = (state) => {
  return {
    status: state.admin.status,
    data: state.admin.data,
    dataDebet: state.admin.dataDebet,
    succ: state.admin.succ,
    loading: state.admin.loading,
    dataCreditCard: state.admin.dataCreditCard,
    DataNews: state.admin.DataNews,
  };
};

export default connect(MapState, {
  CreateBank,
  GetBank,
  DeleteBank,
  GetDebetCards,
  CreateDebetCard,
  DeleteDebet,
  UpadteBank,
  UpdateDebetCard,
  CreateCreditCard,
  GetCreditCards,
  UpdateCreditCard,
  DeleteCreditCard,
  GetNews,
  CreateNews,
  UpdateNews,
  DeleteNews,
  Clear,
})(AdminCont);
