import React from 'react'
import './Tools.css'
import {FaPlus, FaMinus, FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { useState } from 'react'

export default function Tools({data, toggle, selected, setSelected, forceUpdate}) {
  const [edit, setEdit] = useState(false)
  const [product, setProduct] = useState({})
  const [amount, setAmount] = useState('')

  const editProduct = () => {
    forceUpdate()
    const updProducts = data.filter(item => item.title.toLowerCase() !== product.category.toLowerCase())
    const thisProducts = data.find(item => item.title.toLowerCase() === product.category.toLowerCase())
    const thisProduct = thisProducts.data.find(item => item.title === product.title)
    const updProduct = thisProducts.data.filter(item => item.title !== product.title)
    thisProduct.amount += Number(amount)
    // thisProduct.rent += Number(product.amount)
    updProduct.push(thisProduct)
    updProducts.push(thisProducts)
    localStorage.setItem("products", JSON.stringify(updProducts))
    setEdit(false)
  }


  return (
    <div className='tools'>
      tools
      {edit && 
      <div className='editTool'>
        <div className="card">
        <p>Mahsulot sonini o'zgartirmoqchimisiz?</p>
        <input type="number" placeholder='0' value={amount} onChange={e => setAmount(e.target.value)} />
        <div className="btns">
          <button onClick={editProduct} >Ha</button>
          <button className='refuse' onClick={() => setEdit(false)} >Yo'q</button>
        </div>
        </div>
      </div> }
      <ul>
      {data.map(products => (
          <li key={products.title} >
            <div className="head card" >
              <span className='title' onClick={() => toggle(products.id, selected, setSelected)} >{products.title} {selected === products.id ? <FaAngleUp/> : <FaAngleDown/>}</span>
              <div className="btns">
                <span className='addTool' ><FaPlus/></span>
                <span className="delTool"><FaMinus/></span>
              </div>
            </div>
            {selected === products.id && 
            <ul className="product card">
              {products.data.map(item => (
                <li key={item.id} onDoubleClick={() => (setProduct(item), setEdit(true))} onTouchStart={() => (setProduct(item), setEdit(true))} >
                  <span>{item.title}</span>
                  <div className='amounts' >
                    <div className='amount' ><span className='info' >Jami:</span><span className='light' >{item.amount}</span></div>
                    <div className='amount' ><span className='info' >Ijarada:</span><span className='light' >{item.rent}</span></div>
                    <div className='amount' ><span className='info' >Qoldi:</span><span>{item.amount - item.rent}</span></div>
                  </div>
                </li>
              ))}
            </ul>}
          </li>
        ))}
      </ul>
    </div>
  )
}
