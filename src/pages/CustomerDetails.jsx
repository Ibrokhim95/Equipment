import React, { useState } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaArrowUp, FaHistory, FaArrowDown, FaAngleDown, FaAngleUp } from 'react-icons/fa'

export default function CustomerDetails({customers, setSelected, histories, forceUpdate}) {
  const {customerId} = useParams()
  const updCustomers = customers.filter((c) => c.id !== customerId);
  const customer = customers.find(item => item.id === customerId)
  const [retDebt, setRetDebt] = useState(false)
  const [dec, setDec] = useState('')
  const [seller, setSeller] = useState('')

  const navigate = useNavigate()


  const decrementHandler = () => {
    //  Avanse bermasa shuni qo'shib qo'yish kerak && customer.debt - dec >= 0 va izohga qarzdan va avans
    if(dec > 0 && seller !== '') {
      customer.debt -= dec
      updCustomers.push(customer)
      const obj = {
        amount: dec,
        time: new Date().getTime(),
      }
      const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr",];
      const minute = new Date(obj.time).getMinutes();
      const hour = new Date(obj.time).getHours();
      const day = new Date(obj.time).getDate();
      const month = new Date(obj.time).getMonth();
      const year = new Date(obj.time).getFullYear();
      const getDate = `${day}-${months[month]} ${year}-yil, soat ${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute < 10 ? 0 + minute : minute}`;
      const history = [getDate, [], seller, 'paid', 'Qarzdan', obj.time, 'TO`LANDI', {account: dec}];
      customer.history.push(history)
      histories.trade.push(obj)
      localStorage.setItem('history', JSON.stringify(histories))
      localStorage.setItem('customers', JSON.stringify(updCustomers))
      setDec('')
      setSeller('')
      setRetDebt(false)
      forceUpdate()
    }
  }
  return (
    <div className="customer card">
        <div className='showDebt' >
          <div className="debtInfo" onClick={() => (setRetDebt(!retDebt), setDec(''), setSeller(''))}>
            {retDebt ? <FaAngleUp/> : <FaAngleDown/>} Qarz: 
            <span className='debt' >
              {customer.debt}
            </span> 
            {customer.debt > 0 && <span>so`m</span> }  
          </div> 
          {retDebt && 
          <div className='decDebt' >
            <input className='trader' type="text" name="" id="" placeholder='sotuvchi...' value={seller} onChange={(e) => setSeller(e.target.value)} />
            <div className="decInp">
              <input placeholder='0' value={dec} onChange={e => setDec(e.target.value)} type="number" name="" id="" />
              <button type='button' onClick={decrementHandler}>Berdi</button>
            </div>
          </div>}
        </div>

     <h3 
     >{customer.name}

      <button type='button' onClick={() => {navigate('/'), setSelected(null)}} style={{background:"transparent", padding: '0 10px', fontSize: '14px', color: '#222', fontWeight: '900'}} >X</button>
      </h3>
      <div 
      >
        
        <div className="customerBtns">
          <NavLink className='addTransactionBtn' to="add-transaction" ><FaArrowUp/> Ketdi</NavLink>
          <NavLink className='customerHistoryBtn' to='customer-history' ><FaHistory/>Tarix</NavLink>
          <NavLink className='returnTransactionBtn' to='return-transaction' ><FaArrowDown/>Qaytdi</NavLink>
        </div>

      </div>

      <Outlet/>
    </div>
  )
}
