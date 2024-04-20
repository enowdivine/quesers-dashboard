import React from "react";

const Cards = ({ title, value, desc, color, width, margin }) => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <div
      style={{
        background: color,
        borderRadius: 10,
        padding: 20,
        width: width,
        margin: margin,
      }}
    >
      <h4>{title}</h4>
      <div
        style={{
          display: "flex",
          marginTop: 15,
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: "bold" }}>{formatMoney(value)}</div>
        <div>{desc}</div>
      </div>
    </div>
  );
};

export default Cards;
