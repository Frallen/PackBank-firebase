import React from "react";
import clas from "./news.module.scss";

let News = (props) => {
  return (
    <div className={clas.Main}>
      {props.DataNews.map((p) => (
        <div key={p._id} className={clas.item}>
          <div className={clas.imbbox}>
            <img src={p.title_image} alt="" />
          </div>
          <div className={clas.textbox}>
            <h3 className={clas.Title}>{p.Title}</h3>
            <p className={clas.Text}>{p.Text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
