import React from 'react'
import { useParams } from 'react-router-dom'
import ListHistoryCustomer from './ListHistoryCustomer/ListHistoryCustomer'

export default function CustomerHistory( {customers, setDeleteCustomer, setCustomerId} ) {
  const {customerId} = useParams()
  const customer = customers.find(item => item.id === customerId)
  customer.history.sort((a,b) => { 
    if(a[5] > b[5]) return 1 
    if(a[5] < b[5]) return -1
    return 0
  })
   return (
    <div className='customerHistory' >
      <h4 style={{textAlign: 'center', paddingBlock: '10px'}} >Tarix</h4>
      {customer.history.length ? 
      <div className="card">
        <ListHistoryCustomer customer={customer} className='card' />
      </div>
      : 
        <div className="card">
          <h4 >Bu mijoz bilan hali savdo amalga oshirilmagan</h4>
          <button className='deleteBtn' onClick={() => {setDeleteCustomer(true), setCustomerId(customerId)}} >O'chirish</button>
        </div> 
        }
    
    </div>
  )
}
