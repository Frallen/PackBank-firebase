import { Admin } from "../components/Api/api";

import {
  SubmitStart,
  SubmitEnd,
  Error,
  Clean,
  GetDataBank,
  GetDataDebet,
  GetDataCrd,
} from "./const/const.admin";

let initialstate = {
  loading: false,
  error: null,
  succ: false,
  status: null,
  data: [],
  dataDebet: [],
  dataCreditCard: [],
};

const MainReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SubmitStart:
      return {
        ...state,
        loading: true,
      };
    case SubmitEnd:
      return {
        ...state,
        error: null,
        loading: false,
        succ: true,
        status: action.status,
      };
    //Получить все банки
    case GetDataBank:
      //в имеющися массив data(будь он пустой или нет)
      // копирую новый пришедший массив/объект и создаю новый
      // получается в массив data засовываю новые данные
      return { ...state, data: action.data };
    //Получить все дебетовые карты
    case GetDataDebet:
      return {
        ...state,
        dataDebet: action.dataDebet,
      };
    //Получить все кредитные карты
    case GetDataCrd:
      return {
        ...state,
        dataCreditCard: action.dataCreditCard,
      };
    case Clean:
      return {
        ...state,
        data: null,
        dataDebet: null,
        dataCreditCard: null,
      };
    default:
      return state;
  }
};

export default MainReducer;

export const CleanAllData = () => ({ type: Clean });

//получить записи о всех банках
export const GetBank = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetBanks();

    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataBank, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//получить дебетовые карты
export const GetDebetCards = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetALLDebet();
    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataDebet, dataDebet: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};

//получить кредитные карты
export const GetCreditCards = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetALLCreditCrd();
    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataCrd, dataCreditCard: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
