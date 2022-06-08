import { Admin } from "../components/Api/api";

import {
  SubmitStart,
  SubmitEnd,
  Error,
  Clean,
  GetDataBank,
  GetDataDebet,
  GetDataCrd,
  UpdateOneBank,
  UpdateOneDebet,
  UpdateOneCrd,
  DeleteB,
  DeleteD,
  DeleteC,
  GetDataNews,
  UpdateOneNews,
  DeleteN,
} from "./const/const.admin";

let initialValues = {
  loading: false,
  error: null,
  succ: false,
  status: null,
  data: [],
  dataDebet: [],
  dataCreditCard: [],
  DataNews: [],
};

const AdminReducer = (state = initialValues, action) => {
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
    case GetDataNews:
      return { ...state, DataNews: state.DataNews.concat(action.DataNews) };
    //Получить все банки
    case GetDataBank:
      //в имеющися массив data(будь он пустой или нет)
      // копирую новый пришедший массив/объект и создаю новый
      // получается в массив data засовываю новые данные
      return { ...state, data: state.data.concat(action.data) };
    //Получить все дебетовые карты
    case GetDataDebet:
      return {
        ...state,
        dataDebet: state.dataDebet.concat(action.dataDebet),
      };
    //Получить все кредитные карты
    case GetDataCrd:
      return {
        ...state,
        dataCreditCard: state.dataCreditCard.concat(action.dataCreditCard),
      };
    case UpdateOneNews:
      return {
        ...state,
        DataNews: state.DataNews.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };

    case UpdateOneBank:
      return {
        ...state,
        data: state.data.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };
    case UpdateOneDebet:
      return {
        ...state,
        dataDebet: state.dataDebet.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };
    case UpdateOneCrd:
      return {
        ...state,
        dataCreditCard: state.dataCreditCard.map((p) =>
          p._id === action.data._id ? action.data : p
        ),
      };

    //удалить новости
    case DeleteN:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        DataNews: state.DataNews.filter(
          (item) => item._id !== action.id
        ),
      };

    //удалить банк
    case DeleteB:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        data: state.data.filter((item) => item._id !== action.id),
        dataDebet: state.dataDebet.filter((item) => item.id_bank !== action.id),
        dataCreditCard: state.dataCreditCard.filter(
          (item) => item.id_bank !== action.id
        ),
      };
    //удалить дебет
    case DeleteD:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        dataDebet: state.dataDebet.filter((item) => item._id !== action.id),
      };
    //Удалить кредитную карту
    case DeleteC:
      return {
        ...state,
        //  фильтрую массив,   возвращаю те элементы которые не равны удалленному id
        //беру имеющиеся данные банка, проверяю каждый элемент и возвращаю те которые не равны удаленному id
        dataCreditCard: state.dataCreditCard.filter(
          (item) => item._id !== action.id
        ),
      };
    case Error:
      return {
        ...state,
        error: action.error,
        loading: false,
        status: action.status,
      };
    case Clean: {
      return {
        ...state,
        succ: false,
        status: null,
      };
    }
    default:
      return state;
  }
};

export const Clear = () => ({ type: Clean });

export default AdminReducer;
//создать банк
export const CreateBank = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.NewBank(data);

    dispatch({ type: SubmitEnd, status: snap.status });
    //получаю банк в виде объекта
    dispatch({ type: GetDataBank, data: snap.data.bank });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};

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
//получить записи о всех банках
export const UpadteBank = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateBank(data);

    dispatch({ type: SubmitEnd, status: snap.status });

    dispatch({ type: UpdateOneBank, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};
//удалить банк
export const DeleteBank = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteBank(id);

    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: DeleteB, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
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
//создать дебетовую карту
export const CreateDebetCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.CreateDebet(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: GetDataDebet, dataDebet: snap.data.card });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};
//обновить дебетовую карту

export const UpdateDebetCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateDebet(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: UpdateOneDebet, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};

//удалить дебетовую карту
export const DeleteDebet = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteDebet(id);

    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: DeleteD, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
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
//создать кредитную карту
export const CreateCreditCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.CreateCreditCard(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: GetDataCrd, dataCreditCard: snap.data.cardcrd });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};
//обновить кредитную карту

export const UpdateCreditCard = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateCreditCrd(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: UpdateOneCrd, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};

//удалить кредитную карту
export const DeleteCreditCard = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteCreditCrd(id);

    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: DeleteC, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};

//получить дебетовые карты
export const GetNews = () => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.GetNews();
    dispatch({ type: SubmitEnd });
    dispatch({ type: GetDataNews, DataNews: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message });
  }
};
//создать дебетовую карту
export const CreateNews = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.CreateNews(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: GetDataNews, DataNews: snap.data.news });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};
//обновить дебетовую карту

export const UpdateNews = (data) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.UpdateNews(data);
    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: UpdateOneNews, data: snap.data });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};

//удалить дебетовую карту
export const DeleteNews = (id) => async (dispatch) => {
  dispatch({ type: SubmitStart });
  try {
    let snap = await Admin.DeleteNews(id);

    dispatch({ type: SubmitEnd, status: snap.status });
    dispatch({ type: DeleteN, id: snap.data.id });
  } catch (err) {
    dispatch({ type: Error, error: err.message, status: err.response.status });
  }
};
