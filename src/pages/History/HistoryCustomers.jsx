import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ListHistoryCustomer from '../../components/ListHistoryCustomer/ListHistoryCustomer'

export default function HistoryCustomers({history, toggle, selected, setSelected}) {
  const {customers} = history
  const [sortV, setSortV] = useState('')
  const [list, setList] = useState(customers)
  const inpRef = useRef('')

  list.sort((a, b) => {
    if(a.date > b.date) return 1
    if(a.date < b.date) return -1
    return 0
  })

  if(customers.length > 0) {
    if(sortV === 'name'){
      list.sort((a, b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
        return 0
      })
    }
    else if(sortV === 'date'){
      list.sort((a, b) => {
        if(a.date > b.date) return 1
        if(a.date < b.date) return -1
        return 0
      })
    }
  }

  const searchHandler = () => {
    if(inpRef.current.value !== ''){
      setList(customers.filter(c => c.name.includes(inpRef.current.value.toLowerCase())))
    }else{
      setList(customers)
    }
  }

  return (
    <div className='customersHistory card'>
      <h1>Mijozlar tarixi</h1>
      <form action="">
        <select onChange={(e) => setSortV(e.target.value)} name="" id="">
          <option value="date">sana</option>
          <option value="name">ism</option>
        </select>

        <div className="search">
          <input ref={inpRef} type="text" placeholder='Qidirish...' name="" id="" />
          <button onClick={searchHandler} type='button' ><FaSearch/></button>
        </div>
      </form>
        
        <ul>
          {list.map((customer, index) => (
            <li key={index} >
             <div className="customerTitle" onClick={() => toggle(customer.date, selected, setSelected)} >
                <span>{customer.name}</span>
                <span>{new Date(customer.date).getDate() < 10 ? 0 : ''}{new Date(customer.date).getDate()}.{new Date(customer.date).getMonth() + 1 < 10 ? 0 : ''}{new Date(customer.date).getMonth() + 1}.{new Date(customer.date).getFullYear()}</span>
              </div>

              {selected === customer.date && 
                <ListHistoryCustomer customer={customer} />
              }
            </li>
          ))}
        </ul>
    </div>
  )
}
