import "./App.scss";
import "antd/dist/antd.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import HeaderContainer from "./components/HeaderContainer/HeaderContainer";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import DebitContainer from "./components/debit/debitContainer";
import AuthContainer from "./components/auth/auth/authContainer";
import RegistrationContainer from "./components/auth/registration/registrationContainer";
import SettCont from "./components/Settings/SettCont";
import Logout from "./components/auth/logout/logout";
import AdminContainer from "./components/Admin/AdminContainer";
import AdminAuthCont from "./components/Admin/Auth/AdminAuthCont";
import CreditCardCont from "./components/creditcard/credit_card_container";
import NewsContainer from "./components/news/NewsContainer"

const App = (props) => {
  return (
    <div>
      {props.isAuthAdmin ? (
        <Switch>
          <Route path="/admin">
            <AdminContainer></AdminContainer>
          </Route>
          <Route path="/logout">
            <Logout></Logout>
          </Route>
          <Redirect to="/admin"></Redirect>
        </Switch>
      ) : (
        <div className="App">
          <HeaderContainer></HeaderContainer>
          <Route exact path="/">
            <HomeContainer></HomeContainer>
          </Route>

          {props.isAuth ? (
            <Switch>
              <Route path="/news"></Route>
              <Route path="/debit">
                <DebitContainer></DebitContainer>
              </Route>
              <Route path="/credit-card">
                <CreditCardCont></CreditCardCont>
              </Route>
              <Route path="/zaim"></Route>
              <Route path="/settings">
                <SettCont></SettCont>
              </Route>
              <Route path="/logout">
                <Logout></Logout>
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          ) : (
            <Switch>
              <Route path="/admin">
                <AdminAuthCont></AdminAuthCont>
              </Route>
              <Route path="/news">
                <NewsContainer></NewsContainer>
              </Route>
              <Route path="/debit">
                <DebitContainer></DebitContainer>
              </Route>
              <Route path="/credit-card">
                <CreditCardCont></CreditCardCont>
              </Route>
              <Route path="/zaim"></Route>
              <Route path="/login">
                <AuthContainer></AuthContainer>
              </Route>
              <Route path="/registration">
                <RegistrationContainer></RegistrationContainer>
              </Route>
              <Redirect to="/"></Redirect>
            </Switch>
          )}
        </div>
      )}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    isAuthAdmin: state.auth.isAuthAdmin,
  };
};

export default compose(connect(mapStateToProps, null), withRouter)(App);
