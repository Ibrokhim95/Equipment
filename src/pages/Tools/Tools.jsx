import React from 'react'
import './Tools.css'
import {FaPlus, FaMinus, FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { useState } from 'react'

export default function Tools({data, toggle, selected, setSelected}) {
  const [edit, setEdit] = useState(false)
  const [item, setItem] = useState({})

  const editProduct = (product) => {
    setItem(product)
    console.log(item);
  }

  return (
    <div className='tools'>
      tools
      {edit && 
      <div>
        {console.log(produc)}
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
              {products.data.map(product => (
                <li key={product.id} onDoubleClick={() => editProduct(product)} >
                  <span>{product.title}</span>
                  <div className='amounts' >
                    <div className='amount' ><span className='info' >Jami:</span><span className='light' >{product.amount}</span></div>
                    <div className='amount' ><span className='info' >Ijarada:</span><span className='light' >{product.rent}</span></div>
                    <div className='amount' ><span className='info' >Qoldi:</span><span>{product.amount - product.rent}</span></div>
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
