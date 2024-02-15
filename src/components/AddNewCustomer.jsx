import React, { useEffect, useRef, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

export default function AddNewCustomer({forceUpdate, customers, setNewCustomer}) {
   const autoRef = useRef(null);

   const newName = () => {
      const addCustomer = () => {
         setNewCustomer(false)
         const customer = {
            id: uuidv4(),
            name: autoRef.current.value.toLowerCase(),
            tools: [],
            history: [],
            debt: 0
         }
         customers.push(customer)
         localStorage.setItem('customers', JSON.stringify(customers))
         forceUpdate()
      }
      addCustomer()
    }

       
   return (
    <>
      <div className='addCustomer'>
         <input type={'text'} ref={autoRef}/>
         <div style={{display: 'flex', justifyContent: 'spaceBetween',}} >
            <button onClick={() => newName()} >Qo'shish</button> 
            <button onClick={() => setNewCustomer(false)} style={{background: 'red',}} >x</button>
         </div>  
      </div> 
    </>
  )
}
