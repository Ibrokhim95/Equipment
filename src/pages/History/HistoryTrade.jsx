import React, { useEffect, useState } from 'react'

export default function HistoryTrade({history, forceUpdate}) {
  const [date, setDate] = useState('')
  const [date2, setDate2] = useState('')
  const time2 = new Date(date).getTime()
  const months = ["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr",];
  
  const daily = 86400000
  const hourly = 3600000
  const minute = new Date().getMinutes()
  const hour = new Date().getHours()
  const weekday = new Date().getDay()
  const day = new Date().getDate()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const time = new Date().getTime()
  const monthstart = new Date(`${month}.01.${year}`)
  const yearstart = new Date(`01.01.${year}`)
  
  const time3 = new Date(date2).getTime() + (19 * hourly)

  const startToday = new Date().getTime() - (hour * hourly) - (minute * (hourly / 60))
  const todays = history.trade.filter(trade => trade.time > startToday)
  const showToday = todays.reduce((acc, current) => {
    acc += current.amount
    return acc
  }, 0)

  const weekstart = time - ((weekday - 1) * daily) - ((hour * hourly) + (minute * (hourly / 60))) 
  const weeks = history.trade.filter(trade => trade.time > weekstart) 
  const showWeek = weeks.reduce((acc, current) => {
    acc += current.amount
    return acc
  }, 0)

  const mon = history.trade.filter(trade => trade.time > monthstart) 
  const showMonth = mon.reduce((acc, current) => {
    acc += current.amount
    return acc
  }, 0)

  const years = history.trade.filter(trade => trade.time > yearstart) 
  const showYear = years.reduce((acc, current) => {
    acc += current.amount
    return acc
  }, 0)

  const [start, setStart] = useState(monthstart)
  const [end, setEnd] = useState(time)
  const startDay = new Date(start).getDate()
  const startMonth = new Date(start).getMonth() 
  const endDay = new Date(end).getDate()
  const endMonth = new Date(end).getMonth() 

  const [showMain, setShowMain] = useState(null)
  useEffect(() => {
    setStart(time2)
    setEnd(time3)
    const ent = history.trade.filter(trade => (trade.time > start && trade.time < end))
    const main = ent.reduce((acc, current) => {
      acc += current.amount
      return acc
    }, 0)
    setShowMain(main)
  }, [date, date2, start, end])

  return (
    <div className='card historyTrade' >
      
      <h1>Savdolar tarixi</h1>

      <div className='show'>
        <p className="showCount">{date === '' && date2 === '' ? showMonth : showMain}<span> so'm</span></p>
        <p className='fromToDate' >
          <span>{date === '' ? new Date(monthstart).getDate() : startDay} {months[(date === '' ? new Date(monthstart).getMonth()  : startMonth)]} - {date2 === '' ? new Date(time).getDate() : endDay - 1} {months[(date2 === '' ? new Date(time).getMonth() : endMonth)]}</span>
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
            {/* <button type='button' onClick={enter}>Ko'rish</button> */}
          </div>
        </form>

      <div className='showOther'>
        <p>Bugungi: </p>
        <span>{showToday}<span> so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Shu Haftaniki: </p>
        <span>{showWeek}<span> so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Shu Oyniki: </p>
        <span>{showMonth}<span> so'm</span></span>
      </div>

      <div className='showOther'>
        <p>Shu Yilniki: </p>
        <span>{showYear} <span> so'm</span></span>
      </div>
    </div>
  )
}
