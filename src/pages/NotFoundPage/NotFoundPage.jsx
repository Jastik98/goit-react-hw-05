import React from "react";

const settings = {
  display: "flex",
  justifyContent: "center",
};

const NotFoundPage = ({ title }) => {
  return (
    <div style={settings}>
      <h3>Not found page. {title} </h3>
    </div>
  );
};

export default NotFoundPage;
