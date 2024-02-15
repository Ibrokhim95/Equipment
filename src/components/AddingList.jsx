import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ({ listProducts, setListProducts, customers, setListHistory, listHistory }) {
  const { customerId } = useParams();
  const [date, setDate] = useState("");
  const [showError, setShowError] = useState("");
  const [desc, setDesc] = useState('')
  const [seller, setSeller] = useState('')
  const updCustomers = customers.filter((c) => c.id !== customerId);
  
  const addProductToList = () => {
     const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
     const minute = new Date(date).getMinutes()
     const hour = new Date(date).getHours()
     const day = new Date(date).getDate()
     const month = new Date(date).getMonth()
     const year = new Date(date).getFullYear()
     const getDate = `${day}-${months[month]} ${year}-yil, soat ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute < 10 ? 0 + minute : minute}`
     const customer = customers.find((item) => item.id === customerId);
     if (date !== "" && seller !== '') {
      const time = new Date(date).getTime();
      listProducts.map(product => {
        product.time = time;
        product.date = date;
        
        const bor = customer.tools.find(item => item[0].productName === product.productName)
        if(bor !== undefined){
          bor.push(product)
        }else{
          const arr = []
          arr.push(product)
          customer.tools.push(arr)
        }
      })
      const history = [getDate, [...listProducts], seller, 'green', desc, time]
      customer.history.push(history)
    }
    updCustomers.push(customer);
    localStorage.setItem("customers", JSON.stringify(updCustomers))
    setListHistory(customer.history)
    setDate('')
    setDesc('')
    setSeller('')
    setListProducts('')
  };

  {listProducts !== '' ? listProducts.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  }) : null}

  const removeFromList = (id) => {
    const filtered = listProducts.filter((item) => item.id !== id);
    setListProducts(filtered);
  };

  return (
    <div className="addListTools">
      <table className="listAddingTools">
        <thead>
          <tr>
            <th>nomi</th>
            <th>soni</th>
            <th>narxi</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody>
          {listProducts !== '' ? listProducts.map((item, index) => (
            <tr key={item.id} className="mb">
              <td>
                {index + 1}. {item.title}{" "}
                {item.title === "opalobka" ? item.productName : null}
              </td>
              <td>{item.amount}ta</td>
              <td>{item.perPiece}</td>
              <td>{item.amountAddition}</td>
              <td className="removeBtn">
                <button onClick={() => removeFromList(item.id)} type="button">
                  x
                </button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
      <form className="addToolInp" action="">
        <input
          type={"datetime-local"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="dateInput"
        />
        <input type={"text"} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Izoh" />
        <input type={"text"} value={seller} onChange={e => setSeller(e.target.value)} placeholder="Sotuvchi" />
        <button type="button" onClick={addProductToList} >+</button>
      </form>
      <h4>{showError}</h4>
    </div>
  );
}
