import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import {products} from "../Data"
import Form from './Form';
import {v4 as uuidv4} from 'uuid'
import AddingList from './AddingList';
import { useEffect } from 'react';

export default function AddTransaction({toggle, customers, listHistory, setListHistory, products}) {
  const [height, setHeight] = useState('all')
  const [productId, setProductId] = useState('')
  const [productValue, setProductValue] = useState(products[0])
  const [selected, setSelected] = useState(null)
  const [listProducts, setListProducts] = useState([])

  products.sort((a, b) => {
    if(a.title > b.title) return 1
    if(a.title < b.title) return -1
    return 0
  })

  const productHandler = (product) =>{
    setProductId(product.id)
    setProductValue(product)
  }
  
  const data = products.find(product => product.title.toLowerCase() === 'opalobka').data
  let allProduct = data
  const filterData = () => {
    const filtered = products[0].data.filter(item => item.height === height)
    if(height === 'all'){
      allProduct = data
    } else {
      allProduct = filtered
    }
  } 
  filterData()

  return (
    <div className="addTransaction">
      <div className="selectProduct">
        {products.map(product => (
          <div key={product.id} onClick={() => productHandler(product)} className={(productId === product.id ? 'btn productBtn' : 'btn')} >
            <img src={product.img} alt="" />
            <span>{product.title}</span>
          </div>
        ))}
      </div>

      <div className="productsTitle">
      <h4>{productValue.title}</h4>
      <select className={productValue.title === 'Opalobka' ? '' : 'hidden' } onChange={(e) => setHeight(e.target.value)} >
        <option value={'60'}>60cm</option>
        <option value={'50'}>50cm</option>
        <option value={'40'}>40cm</option>
        <option value={'25'}>25cm</option>
      </select>
      </div>
      <ul className="list">
          {productValue.title === 'Opalobka' 
          ?(allProduct.map(product => (
          <li key={product.id} >
            <div className="title"  onClick={() => toggle(product.id, selected, setSelected)} >
                  <p>{product.length}m x {product.height}cm</p>
                  <p>{product.amount - product.rent}</p>
            </div>
            <Form toggle={toggle} selected={selected} setSelected={setSelected} product={product}  listPrdoucts={listProducts} setListProducts={setListProducts} />
          </li>
        )))  
        : 
        (productValue.data.map(product => (
          <li key={product.id} >
            <div className="title" onClick={() => toggle(product.id, selected, setSelected)}>
                <p>{product.title}</p>
                <p>{product.amount - product.rent}</p>
            </div>
            <Form toggle={toggle} selected={selected} setSelected={setSelected} product={product} listPrdoucts={listProducts} setListProducts={setListProducts}/>
          </li>
          
          )
        ))
        // null
        }
      </ul>
      
      <AddingList products={products} allProduct={allProduct} productValue={productValue} listHistory={listHistory} setListHistory={setListHistory} listProducts={listProducts} setListProducts={setListProducts} customers={customers} />
    </div>
  );
}
