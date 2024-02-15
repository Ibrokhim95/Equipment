import React, { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function Form({
  toggle,
  selected,
  setSelected,
  product,
  listPrdoucts,
  setListProducts,
}) {
  const [method, setMethod] = useState(product.select[0]);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [perPiece, setPerPiece] = useState("");
  const [addition, setAddition] = useState("");
  const [amountAddition, setAmountAddition] = useState("");

  useEffect(() => {
    let calc = 0;

    if (product.title === "lesa") {
      if (method === "komp") {
        calc = price / 24;
        setPerPiece(calc.toFixed());
      } else {
        calc = price;
        setPerPiece(calc);
      }
    } else if (product.title === "opalobka") {
      if (method === "metr") {
        calc = product.length * price;
        setPerPiece(calc);
      } else {
        calc = price;
        setPerPiece(calc);
      }
    } else {
      setPerPiece(price);
    }
  }, [price, method]);

  const error = null;

  const calculatePrice = () => {
    if (price <= 0 || amount <= 0) {
      return error;
    }
    if (product.title === "lesa") {
      if (method === "dona") {
        setShowPrice(
          `${amount} donasi ${price} so'mdan ${
            price * amount
          } so'm, Komplekti ${(24 / amount) * (amount * price)} so'mdan bo'ladi`
        );
      } else if (method === "y.komp") {
        setShowPrice(
          `${amount} ta yarim komplekti ${price} so'mdan ${
            price * amount
          } so'm, Komplektiga ${price * 2} so'mdan, ${
            amount * 12
          } dona, Donasiga ${price / 12} so'mdan bo'ladi`
        );
      } else {
        setShowPrice(
          `Komplekti ${price} so'mdan donasi ${(
            price / 24
          ).toFixed()} so'mdan bo'ladi`
        );
      }
    } else if (product.title === "opalobka") {
      if (method === "metr") {
        setShowPrice(
          `metrga ${price} so'mdan 1 donasi ${
            price * product.length
          } so'm, Jami ${product.length * amount} metr, ${
            price * amount * product.length
          } so'm bo'ladi`
        );
      } else {
        setShowPrice(
          `${price} so'mdan ${amount} donasi ${price * amount} so'm, ${
            amount * product.length
          } metr, metriga ${price / product.length} so'mdan bo'ladi`
        );
      }
    } else if (product.title === "meshalka") {
      setShowPrice(
        `${price} so'mdan ${amount} ${method} ${price * amount} so'm bo'ladi`
      );
    } else {
      setShowPrice(
        `${price} so'mdan ${amount} tasi, Jami ${price * amount} so'm bo'ladi`
      );
    }
  };

  const addingProduct = (listPrdoucts, setListProducts) => {
    if (price <= 0 || amount <= 0) {
      return error;
    }
    let productName = "";

    if (product.title === "opalobka") {
      productName = product.length + "m." + product.height + "cm";
    } else {
      productName = product.title;
    }
    const newProduct = {
      id: uuidv4(),
      title: product.title,
      productName,
      price: Number(price),
      perPiece: Number(perPiece),
      amount: Number(amount),
      method,
      amountAddition: Number(amountAddition),
      addition
    };
    if (listPrdoucts.length > 0) {
      const filtered = listPrdoucts.filter(
        (item) => item.productName !== newProduct.productName
      );
      filtered.push(newProduct);
      setListProducts(filtered);
    } else {
      setListProducts([newProduct]);
    }
    toggle(product.id, selected, setSelected);
    setAmount('')
    setPrice('')
    setShowPrice('')
    setAddition('')
    setAmountAddition('')
  };

  return (
    <div className={selected === product.id ? "form" : "hidden"}>
      <div className="listInput">
        <form>
          <div className="addAmountInput">
            <input
              type="number"
              className="countInput"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="soni"
            />
          </div>
          <div className="priceInput">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="narxi"
            />
            <select onChange={(e) => setMethod(e.target.value)} name="" id="">
              {product.select.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="additions">
        <p>Qo'shimchalar</p>
        <form action="">
          <label htmlFor="">
            soni <br />
            <input value={amountAddition} onChange={e => setAmountAddition(e.target.value)} className="additionAmount" type="number" placeholder="0" />
          </label>
          <label htmlFor="">
            nomi <br />
            <input
              className="addition"
              type="text"
              placeholder="qo'shimcha nomi"
              value={addition} onChange={e => setAddition(e.target.value)}
            />
          </label>
        </form>
      </div>

      <div className="showCalculate">
        <p>{showPrice}</p>
        <button type="button" onClick={calculatePrice} className="calculateBtn">
          <FaCheck /> hisoblash
        </button>
        <button
          type="button"
          onClick={() => addingProduct(listPrdoucts, setListProducts)}
        >
          <FaPlus /> Qo'shish
        </button>
      </div>
    </div>
  );
}
