import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function ReturnTransaction({
  toggle,
  customers,
  forceUpdate,
  setDeleteCustomer,
  setCustomerId,
  histories,
  listHistory,
  setListHistory,
}) {
  const { customerId } = useParams();
  const customer = customers.find((item) => item.id === customerId);
  const updCustomers = customers.filter((c) => c.id !== customerId);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [addition, setAddition] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [seller, setSeller] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reportList, setReportList] = useState([]);
  const list = [];
  const report = [[]];

  customer.tools.map((item) => {
    const total = item.reduce(
      (total, current) => {
        const { amount, productName, addition, amountAddition } = current;

        total.amount += Number(amount);
        total.productName = productName;
        total.amountAddition += Number(amountAddition);

        return total;
      },
      { amount: 0, productName: "", amountAddition: 0 }
    );
    list.push(total);
  });

  const returnList = (product) => {
    const filtered = list.filter(
      (tool) => tool.productName === product.productName
    );
    if (
      amount > 0 &&
      list.filter((tool) => tool.productName === product.productName)[0]
        .amount >= amount &&
      list.filter((tool) => tool.productName === product.productName)[0]
        .amountAddition >= addition
    ) {
      const newProduct = {
        id: uuidv4(),
        productName: product.productName,
        amount: amount,
        addition: addition,
      };
      if (listProducts.length > 0) {
        const filtered = listProducts.filter(
          (product) => product.productName !== newProduct.productName
        );
        filtered.push(newProduct);
        setListProducts(filtered);
      } else {
        setListProducts([newProduct]);
      }
      toggle(product.id, selected, setSelected);
      setAmount("");
      setAddition("");
    }
  };

  const removeFromList = (id) => {
    const filtered = listProducts.filter((item) => item.id !== id);
    setListProducts(filtered);
  };

  const returnProducts = () => {
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    const minute = new Date(date).getMinutes();
    const hour = new Date(date).getHours();
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const getDate = `${day}-${months[month]} ${year}-yil, soat ${
      hour < 10 ? "0" : ""
    }${hour}:${minute < 10 ? "0" : ""}${minute < 10 ? 0 + minute : minute}`;
    const customer = customers.find((item) => item.id === customerId);
    if (date !== "" && seller !== "") {
      const time = new Date(date).getTime();
      const newTools = customer.tools;
      report.push(getDate, time);

      listProducts.map((product) => {
        product.time = time;
        product.date = date;
        const filter = customer.tools.filter(
          (item) => item[0].productName === product.productName
        );
        filter[0].sort((a, b) => a.time - b.time);
        if (filter[0][0].method === "soat") {
          let ind = 0;
          let residualGrain = product.amount;
          let balanceAddition = product.addition;
          let balanceAmount = 0;
          for (let i = 0; i < filter[0].length; i++) {
            if (
              filter[0][ind].amount - residualGrain >= 0 &&
              residualGrain !== 0
            ) {
              const hours = Math.ceil(
                (time - filter[0][ind].time) / (1000 * 60 * 60)
              );
              const account =
                residualGrain * hours * filter[0][ind].perPiece + balanceAmount;
              filter[0][ind].amount = filter[0][ind].amount - residualGrain;
              residualGrain = 0;
              product.account = account;
              product.count = 0;
              product.discount = 0;
              filter[0][ind].amount = filter[0][ind].amount - residualGrain;
              residualGrain = 0;
              if (filter[0][ind + 1] && filter[0][ind].amount === 0) {
                filter[0][ind + 1].amountAddition =
                  filter[0][ind + 1].amountAddition -
                  (balanceAddition - filter[0][ind].amountAddition);
                balanceAddition = 0;
              } else {
                filter[0][ind].amountAddition =
                  filter[0][ind].amountAddition - balanceAddition;
              }
            } else if (filter[0][ind].amount - residualGrain < 0) {
              const hours = Math.ceil(
                (time - filter[0][ind].time) / (1000 * 60 * 60)
              );
              residualGrain = residualGrain - filter[0][ind].amount;
              balanceAmount =
                balanceAmount +
                filter[0][ind].amount * hours * filter[0][ind].perPiece;
              balanceAddition = balanceAddition - filter[0][ind].amountAddition;
              filter[0][ind].amount = 0;
              filter[0][ind].amountAddition = 0;
              ind = ind + 1;
            }
          }
          report[0].push(product);
        } else {
          let ind = 0;
          let residualGrain = product.amount;
          let discount = 0;
          let balanceAddition = product.addition;
          let balanceAmount = 0;
          let balanceAccount = 0;
          let bonusDay = 0;
          let fewDays = 0;
          for (let i = 0; i < filter[0].length; i++) {
            if (
              filter[0][ind].amount - residualGrain >= 0 &&
              residualGrain !== 0
            ) {
              const days = Math.ceil(
                (time - filter[0][ind].time) / (1000 * 60 * 60 * 24)
              );
              bonusDay = Math.floor(days / 7);
              fewDays = days - bonusDay;
              const count =
                residualGrain * days * filter[0][ind].perPiece + balanceAmount;
              const account =
                residualGrain * fewDays * filter[0][ind].perPiece +
                balanceAccount;
              discount = count - account;
              product.count = count;
              product.account = account;
              product.discount = discount;
              filter[0][ind].amount = filter[0][ind].amount - residualGrain;
              residualGrain = 0;
              if (filter[0][ind + 1] && filter[0][ind].amount === 0) {
                filter[0][ind + 1].amountAddition =
                  filter[0][ind + 1].amountAddition -
                  (balanceAddition - filter[0][ind].amountAddition);
                balanceAddition = 0;
              } else {
                filter[0][ind].amountAddition =
                  filter[0][ind].amountAddition - balanceAddition;
              }
            } else if (filter[0][ind].amount - residualGrain < 0) {
              const days = Math.ceil(
                (time - filter[0][ind].time) / (1000 * 60 * 60 * 24)
              );
              bonusDay = Math.floor(days / 7);
              fewDays = days - bonusDay;
              residualGrain = residualGrain - Number(filter[0][ind].amount);
              balanceAddition = balanceAddition - filter[0][ind].amountAddition;
              balanceAmount =
                balanceAmount +
                filter[0][ind].amount * days * filter[0][ind].perPiece;
              balanceAccount =
                balanceAccount +
                filter[0][ind].amount * fewDays * filter[0][ind].perPiece;
              filter[0][ind].amount = 0;
              filter[0][ind].amountAddition = 0;
              ind = ind + 1;
            }
          }
          report[0].push(product);
        }
        const filtered = [];
        filtered.push(filter[0].filter((item) => item.amount !== 0));
        newTools
          .filter((item) => item[0].productName !== product.productName)
          .push(filter[0]);
        const update = newTools
          .map((tool) => tool.filter((item) => item.amount !== 0))
          .filter((item) => item.length > 0);
        customer.tools = update;
        list.push(update);
      });
    }
    updCustomers.push(customer);
    localStorage.setItem("customers", JSON.stringify(updCustomers));
    setShowReport(true);
    setReportList(report);
  };

  const reportPrice = [];
  if (reportList.length > 0) {
    const total = reportList[0].reduce(
      (total, current) => {
        const { count, account, discount } = current;

        total.count += count;
        total.account += account;
        total.discount += discount;

        return total;
      },
      { count: 0, account: 0, discount: 0 }
    );
    reportPrice.push(total);
  }

  const reportHandler = (type) => {
    let status = "";
    if (type === "paid") {
      status = "TO`LANDI";
      const obj = {
        amount: reportPrice[0].account,
        time: reportList[2],
      };
      histories.trade.push(obj);
      localStorage.setItem("history", JSON.stringify(histories));
    } else if (type === "dnpay") {
      status = "TO`LANMADI";
      customer.debt += reportPrice[0].account;
    }

    const history = [
      reportList[1],
      listProducts,
      seller,
      type,
      desc,
      reportList[2],
      status,
      reportPrice[0],
    ];
    listHistory.push(history);
    setListHistory(listHistory);
    customer.history = listHistory;
    setShowReport(false);
    updCustomers.push(customer);
    localStorage.setItem("customers", JSON.stringify(updCustomers));

    setDate("");
    setDesc("");
    setSeller("");
    setListProducts("");
    forceUpdate();
  };

  return (
    <div>
      <h4
        className="card"
        style={{ textAlign: "center", paddingBlock: "10px" }}
      >
        Qaytdi
      </h4>
      {customer.tools.length ? (
        <div>
          <ul className="list">
            {list.map((item, index) => (
              <li className="retCard" key={index}>
                <div
                  className="returnList"
                  onClick={() => toggle(index, selected, setSelected)}
                >
                  <p>
                    {item.productName} {item.amount} ta,
                  </p>
                  <p>
                    qo'shimcha {item.amountAddition}
                    {item.amountAddition > 0 ? " ta" : ""}
                  </p>
                </div>
                <form className={selected === index ? "" : "hidden"} action="">
                  <label htmlFor="">
                    {item.productName} <br />
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      name=""
                      id=""
                    />
                    ta
                  </label>{" "}
                  <br />
                  {item.amountAddition > 0 ? (
                    <label htmlFor="">
                      qo'shimcha <br />
                      <input
                        value={addition}
                        onChange={(e) => setAddition(e.target.value)}
                        type="number"
                        name=""
                        id=""
                      />
                      ta
                    </label>
                  ) : null}
                  <label onClick={() => returnList(item)} htmlFor="">
                    <button type="button">Qaytdi</button>
                  </label>
                </form>
              </li>
            ))}
          </ul>

          <div className="addListTools">
            <table className="listAddingTools">
              <thead>
                <tr>
                  <th>nomi</th>
                  <th>soni</th>
                  <th>qo'shimcha</th>
                </tr>
              </thead>
              <tbody>
                {listProducts !== ""
                  ? listProducts.map((item, index) => (
                      <tr key={index} className="mb">
                        <td>
                          {index + 1}. {item.productName}{" "}
                        </td>
                        <td>{item.amount}ta</td>
                        <td>{item.addition}</td>
                        <td className="removeBtn">
                          <button
                            onClick={() => removeFromList(item.id)}
                            type="button"
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <form className="addToolInp" action="">
              <input
                type={"datetime-local"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="dateInput"
              />
              <input
                type={"text"}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Izoh"
              />
              <input
                type={"text"}
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                placeholder="Sotuvchi"
              />
              <button onClick={returnProducts} type="button">
                +
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card">
          <h4>Bu mijoz bilan hali savdo amalga oshirilmagan</h4>
          <button
            className="deleteBtn"
            onClick={() => {
              setDeleteCustomer(true), setCustomerId(customerId);
            }}
          >
            O'chirish
          </button>
        </div>
      )}
      {showReport ? (
        <div className="report">
          <div className="report-card">
            <ul>
              {reportList[0].map((item) => (
                <li key={item.id}>
                  <span>
                    {item.productName} {item.amount}ta
                  </span>{" "}
                  <br />
                  <div className="report-price">
                    <div>
                      Jami: <span>{item.count},</span>
                    </div>
                    <div>
                      Chegirma: <span>{item.discount},</span>
                    </div>
                    <div className="pay">
                      To'lov summasi: <span>{item.account}</span>
                    </div>
                  </div>
                </li>
              ))}
              <li className="all-price">
                <div>
                  Jami: <span>{reportPrice[0].count}</span>
                </div>
                <div>
                  Chegirma: <span>{reportPrice[0].discount}</span>
                </div>
                <div>
                  To'lov summasi: <span>{reportPrice[0].account}</span>
                </div>
              </li>
            </ul>

            <div className="btns">
              <button
                className="paidBtn"
                type="button"
                onClick={() => reportHandler("paid")}
              >
                Berdi
              </button>
              <button
                className="dnpayBtn"
                type="button"
                onClick={() => reportHandler("dnpay")}
              >
                Bermadi
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
