import { Auth } from "../components/Api/api";

const RegStart = "RegStart";
const RegEnd = "RegEnd";
const Clean = "Clean";
const SucMess = "SucMess";
const Error = "Error";
const CleanStorage = "CleanStorage";

//чекаю локалсторадж на предмет данных
const user = JSON.parse(localStorage.getItem("userData"));
//если юзер есть и он не админ то true
const tr = user&&!user.isADMIN
//если юзер есть и он админ то true
const fr=user&&user.isADMIN

let initialState = {
  error: null,
  loading: false,
  succ: false,
  isAuth: tr,
  isAuthAdmin: fr
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case RegStart:
      return {
        ...state,
        loading: true,
      };
    case RegEnd:
      return {
        ...state,
        loading: false,
        succ: action.succ,
       isAuth: action.isAuth && action.isAuth,
        isAuthAdmin:action.isAuthAdmin&&action.isAuthAdmin
      };

    case SucMess:
      return {
        ...state,
        succ: action.succ,
      };
    case Clean:
      return {
        ...state,
        loading: false,
        error: null,
        succ: false,
      };
    case Error:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CleanStorage:
      return {
        ...state,
        isAuth: false,
        isAuthAdmin:false,
      };
    default:
      return state;
  }
};

export default AuthReducer;

export const ClearUp = () => ({ type: Clean });

export const LogOut = () => async (dispatch) => {
  Auth.logout();
  dispatch({ type: CleanStorage });
};

//аутентификация
export const AuthMe = (data) => async (dispatch) => {
  dispatch({ type: RegStart });
  try {
    await Auth.Enter(data);
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      dispatch({ type: RegEnd, isAuth: true });
    }
  } catch (err) {
    dispatch({ type: Error, payload: err.response.data.message });
  }
};


//аутентификация админа
export const AuthMeAdmin = (data) => async (dispatch) => {
  dispatch({ type: RegStart });
  try {
    await Auth.Admin(data);
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      dispatch({ type: RegEnd, isAuthAdmin: true });
    }
  } catch (err) {
    dispatch({ type: Error, payload: err.response.data.message });
  }
};

//регистрация
export const NewUser = (data) => async (dispatch) => {
  dispatch({ type: RegStart });
  try {
    await Auth.NewUser(data);

    dispatch({
      type: RegEnd,
      succ: true,
    });
  } catch (err) {
    dispatch({ type: Error, payload: err.response.data.message });
  }
};
