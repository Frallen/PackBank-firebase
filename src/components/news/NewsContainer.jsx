import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GetNews } from "../../redux/adminReducer";
import Preloader from "../etc/Preloader";
import News from "./News";

const NewsContainer = (props) => {
  const [succ] = useState(props.succ === true ? true : false);
  useEffect(() => {
    //

    props.GetNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [succ]);

  return props.DataNews ? <News {...props}></News> : <Preloader></Preloader>;
};

let mapTOProps = (state) => {
  return {
    DataNews: state.admin.DataNews,
    loading: state.admin.loading,
    succ: state.admin.succ,
  };
};

export default connect(mapTOProps, { GetNews })(NewsContainer);
