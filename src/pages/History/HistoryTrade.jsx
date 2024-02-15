import React, { useState } from 'react'

export default function HistoryTrade({history}) {
  const [date, setDate] = useState('')
  const [date2, setDate2] = useState('')
  const time2 = new Date(date).getTime()
  const time3 = new Date(date2).getTime()
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr",];
  
  // const local = hourly * 5
  
  const daily = 86400000
  const hourly = 3600000
  const minute = new Date().getMinutes()
  const hour = new Date().getHours()
  const weekday = new Date().getDay()
  const day = new Date().getDate()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const time = new Date().getTime()
  const weekstart = time - ((weekday - 1) * daily) - ((hour * hourly) + (minute * (hourly / 60))) 
  const monthstart = new Date(`${month}.01.${year}`)
  const yearstart = new Date(`01.01.${year}`)
  
  const [start, setStart] = useState(monthstart)
  // const [start, setStart] = useState(monthstart)
  const startDay = new Date(start).getDate()
  const startMonth = new Date(monthstart).getMonth() + 1
  
  const getTime = () => {
    console.log(new Date(monthstart))
    // console.log(new Date('04.02.2024').getTime())
  }
  console.log(start);
  return (
    <div className='card historyTrade' >
      
      <h1>Savdolar tarixi</h1>

      <div className='show' >
        <p className="showCount">3200<span> so'm</span></p>
        <p className='fromToDate' >
          <span>{startDay} {months[month -1]} - {day} {months[month - 1]}</span>
        </p>
      </div>
        
        <form action="">
          <div className="inputs">
          <label htmlFor="">
            <span>dan</span>
            <input type={'date'} value={date} onChange={e => setDate(e.target.value)} name="" id="" />
          </label>
          <label htmlFor="">
            <span>gacha</span>
            <input type={'date'} value={date2} onChange={e => setDate2(e.target.value)} name="" id="" />
          </label>
          </div>
          <div className="btn">
            <button type='button' onClick={getTime}>Ko'rish</button>
          </div>
        </form>

      <div className='showOther'>
        <p>Bugungi: </p>
        <span>0 <span>so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Shu Haftaniki: </p>
        <span>0 <span>so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Shu Yilniki: </p>
        <span>0 <span>so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Hammasi: </p>
        <span>0 <span>so'm</span></span>
      </div>

    </div>
  )
}
