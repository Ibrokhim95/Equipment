import React from "react";
import './ListHistoryCustomer.css'

function ListHistoryCustomer({ customer }) {
  return (
    <>
      {customer.history.map((h, index) => (
        <div key={index} className={`${h[3]} listHistory`}>
          <div className="date">{h[0]}</div>
          {h[1].length > 0 && (
            <ul className="tools">
              {h[1].map((tool) => (
                <li key={tool.id}>
                  <div className="title">
                    {tool.category === "opalobka" && <span>{tool.category}</span>}
                    <span>{tool.title} </span>
                    {tool.amount}
                    <span> ta</span>
                  </div>
                  {tool.price ? (
                    <div>
                      {tool.price} <span> so'mdan </span> {tool.method}
                      <span> ga, </span>
                    </div>
                  ) : null}
                  {tool.amountAddition ? (
                    <div>
                      <span>va </span>
                      {tool.amountAddition} <span> ta {tool.addition}</span>{" "}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          {h[4] !== "" && (
            <div className="historyDesc">
              <span>Izoh: </span>
              {h[4]}
            </div>
          )}
          {h[2] !== "" && (
            <div className="historySeller">
              <span>Sotuvchi: </span>
              {h[2]}
            </div>
          )}

          {h[7] && (
            <div className="price">
              {h[7].count && (
                <div>
                  Jami: <span>{h[7].count}</span>
                </div>
              )}
              {h[7].discount && (
                <div>
                  Chegirma: <span>{h[7].discount}</span>
                </div>
              )}
              {h[7].account && (
                <div>
                  To'lov summasi: <span>{h[7].account}</span>
                </div>
              )}
            </div>
          )}

          {h[3] === "paid" || h[3] === "dnpay" ? (
            <div className="stamp">
              <div className="signet">{h[6]}</div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}

export default ListHistoryCustomer;
