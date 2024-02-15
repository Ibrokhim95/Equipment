import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AddNewCustomer from './AddNewCustomer';

export default function CustomersList({toggle, selected, forceUpdate, setSelected, setLisstHistory}) {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const [newCustomer, setNewCustomer] = useState(false)

  return (
   <>
      {selected === null && <button style={{'marginBottom': '60px', 'width': '110px', 'marginInline': 'auto'}} onClick={() => setNewCustomer(!newCustomer)}>Yangi mijoz</button>}
      {newCustomer && <AddNewCustomer forceUpdate={forceUpdate} customers={customers} setNewCustomer={setNewCustomer} />}
      {customers.length > 0 
      ?<div className="customers">
         {customers.map(customer => (
            <div key={customer.id} className="customer">
               <h3 className='customerName' onClick={() => toggle(customer.id, selected, setSelected)}> <span>{customer.name}</span> <span>{selected === customer.id ? '-' : '+'}</span></h3>
               <div className={selected === customer.id ? 'card detailed' : 'card detailed hidden'} >
                  <Link to={`/${customer.id}`} >Batafsil</Link>
               </div>
            </div>
         )) }
      </div> 
      
      :<h3 className='card' >Ijaraga berilgan mahsulotlar yo'q, barcha mahsulotlar qaytib kelgan!</h3>
      }
   </>
  )
}
