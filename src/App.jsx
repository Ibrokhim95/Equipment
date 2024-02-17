import React, { useEffect, useReducer, useState } from "react";
import {Routes, Route} from 'react-router-dom'
import AddTransaction from "./components/AddTransaction";
import CustomerHistory from "./components/CustomerHistory";
import CustomersList from "./components/CustomerList";
import DeleteCustomer from "./components/DeleteCustomer";
import Navbar from "./components/Navbar/Navbar";
import ReturnTransaction from "./components/ReturnTransaction";
import CustomerDetails from "./pages/CustomerDetails";
import History from "./pages/History/History";
import HistoryCustomers from "./pages/History/HistoryCustomers";
import HistoryTrade from "./pages/History/HistoryTrade";
import NoMatch from "./pages/NoMatch";
import Tools from "./pages/Tools/Tools";
import {products} from "./Data"

function App() {
  // localStorage.setItem('products', JSON.stringify(products))

  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const history = JSON.parse(localStorage.getItem("history")) || {customers: [], trade: []};
  const [selected, setSelected] = useState(null)
  const [deleteCustomer, setDeleteCustomer] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [listHistory, setListHistory] = useState([])
  const [data, setData] = useState([])
  const [storage, setStorage] = useState(false)
  
  useEffect(() => {
    if(localStorage.products === undefined){
      setStorage(true)
    }
    setData(JSON.parse(localStorage.getItem("products")) || [])
  }, [reducerValue, deleteCustomer])
  const toggle = (id, value, setValue) => {
    if(value === id) {
      return setValue(null)
    }
    setValue(id)
  }


  return (
    <div className="app">
      <div className="container">
        <Navbar setSelected={setSelected}/>
        {storage && <div className="enter"><button onClick={() => (localStorage.setItem('products', JSON.stringify(products)), setStorage(false))} >Xush kelibsiz!</button></div> }
        {deleteCustomer && <DeleteCustomer customers={customers} setDeleteCustomer={setDeleteCustomer} customerId={customerId} setSelected={setSelected} history={history} />}
        <Routes>
          <Route path="/" element={<CustomersList forceUpdate={forceUpdate} toggle={toggle} selected={selected} setSelected={setSelected} customerId={customerId} deleteCustomer={deleteCustomer} setDeleteCustomer={setDeleteCustomer}/>}/>

          <Route path="/:customerId" element={<CustomerDetails customers={customers} setSelected={setSelected} histories={history} forceUpdate={forceUpdate} />}>
            <Route index element={<CustomerHistory customers={customers} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId}/>}/>
            <Route path="customer-history" element={<CustomerHistory  customers={customers} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId}/>}/>
            <Route path="add-transaction" element={<AddTransaction products={data} toggle={toggle} customers={customers} listHistory={listHistory} setListHistory={setListHistory}/>}/>
            <Route path="return-transaction" element={<ReturnTransaction forceUpdate={forceUpdate } toggle={toggle} customers={customers} deleteCustomer={deleteCustomer} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId} histories={history} listHistory={listHistory} setListHistory={setListHistory}/>}/>
          </Route>

          <Route path="/history" element={<History/>}>
            <Route index element={<HistoryCustomers history={history} toggle={toggle} selected={selected} setSelected={setSelected}/>} />
            <Route path="customers" element={<HistoryCustomers history={history} toggle={toggle} selected={selected} setSelected={setSelected} />}/>
            <Route path="trade" element={<HistoryTrade history={history} forceUpdate={forceUpdate} />} />
          </Route>
          <Route/>
          
          <Route path="/tools" element={<Tools data={data} toggle={toggle} selected={selected} setSelected={setSelected}/>} />

          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
