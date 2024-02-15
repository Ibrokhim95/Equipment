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
import Tools from "./pages/Tools";



function App() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const history = JSON.parse(localStorage.getItem("history")) || {customers: [], trade: []};
  const [selected, setSelected] = useState(null)
  const [deleteCustomer, setDeleteCustomer] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)
  const [listHistory, setListHistory] = useState([])
  useEffect(() => {}, [reducerValue, deleteCustomer])
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
        {deleteCustomer && <DeleteCustomer customers={customers} setDeleteCustomer={setDeleteCustomer} customerId={customerId} setSelected={setSelected} history={history} />}
        <Routes>
          
          <Route path="/" element={<CustomersList forceUpdate={forceUpdate} toggle={toggle} selected={selected} setSelected={setSelected} customerId={customerId} deleteCustomer={deleteCustomer} setDeleteCustomer={setDeleteCustomer}/>}/>
          
          <Route path="/:customerId" element={<CustomerDetails customers={customers} setSelected={setSelected} histories={history} forceUpdate={forceUpdate} />}>
            <Route index element={<CustomerHistory customers={customers} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId}/>}/>
            <Route path="customer-history" element={<CustomerHistory  customers={customers} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId}/>}/>
            <Route path="add-transaction" element={<AddTransaction toggle={toggle} customers={customers} listHistory={listHistory} setListHistory={setListHistory}/>}/>
            <Route path="return-transaction" element={<ReturnTransaction forceUpdate={forceUpdate } toggle={toggle} customers={customers} deleteCustomer={deleteCustomer} setDeleteCustomer={setDeleteCustomer} setCustomerId={setCustomerId} histories={history} listHistory={listHistory} setListHistory={setListHistory}/>}/>
          </Route>

          <Route path="/history" element={<History/>}>
            <Route index element={<HistoryCustomers history={history} toggle={toggle} selected={selected} setSelected={setSelected}/>} />
            <Route path="customers" element={<HistoryCustomers history={history} toggle={toggle} selected={selected} setSelected={setSelected} />}/>
            <Route path="trade" element={<HistoryTrade history={history}/>} />
          </Route>
          <Route/>
          
          <Route path="/tools" element={<Tools/>} />

          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
