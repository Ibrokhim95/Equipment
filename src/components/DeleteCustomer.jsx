import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function DeleteCustomer({customers, setDeleteCustomer, customerId, setSelected, history}) {
  const navigate = useNavigate()
  const customer = customers.find((c) => c.id === customerId)
  
  const dltCustomer = () => {
    const updCustomers = customers.filter((c) => c.id !== customerId);
    localStorage.setItem("customers", JSON.stringify(updCustomers))
    navigate('/')
    setDeleteCustomer(false)
    setSelected(null)
    if(customer.history.length > 0){
      const time = customer.history[customer.history.length - 1][5]
      const obj = {
        name: customer.name,
        history: customer.history,
        date: time
      }
      history.customers.push(obj)
      localStorage.setItem('history', JSON.stringify(history))
    }
  }


  return (
    <div className='deleteCustomer' >
      <div className="container">
        <div className="card">
      <p>Ushbu mijozni o'chirmoqchimisiz?</p>
      {customer.debt > 0 && <p>Ushbu mijozda {customer.debt} so'm qarzdorlik mavjud!</p> }
      <div className="btns">
        <button type='button' onClick={dltCustomer} >Ha</button>
        <button type='button' onClick={() => setDeleteCustomer(false)} >Yo'q</button>
      </div>
        </div>
      </div>
    </div>
  )
}
