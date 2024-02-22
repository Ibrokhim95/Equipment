import React, {useEffect, useState} from 'react'
// import {products} from "../Data"
import Form from './Form';
import AddingList from './AddingList';
import { useNavigate } from 'react-router-dom';

export default function AddTransaction({toggle, customers, listHistory, setListHistory, data}) {
  const [height, setHeight] = useState('all')
  const [productId, setProductId] = useState('')
  const [productValue, setProductValue] = useState([])
  const [selected, setSelected] = useState(null)
  const [listProducts, setListProducts] = useState([])

  const navigate = useNavigate()

  const nav = () => {
    navigate('/')
  } 
  
  {data && data.sort((a, b) => {  
    if(a.title > b.title) return 1
    if(a.title < b.title) return -1
    return 0
  })}



  const productHandler = (product) =>{
    setProductId(product.id)
    setProductValue(product) 
  }
  
  let allProduct = data
  const filterData = () => {
    const products = data.find(product => product.title.toLowerCase() === 'opalobka').data
    const filtered = products.filter(item => item.height === height)
    if(height === 'all'){
      allProduct = products
    } else {
      allProduct = filtered
    }
  } 
 {data ? filterData() : nav()} 
{data &&  allProduct.sort((a,b) => {
    if(a.length > b.length) return 1
    if(a.length < b.length) return -1
    return 0
  })
}

let select = []
const sel = () => {
  const products = data.find(product => product.title.toLowerCase() === 'opalobka').data
  products.sort((a, b) => {
    if(a.height > b.height) return 1
    if(a.height < b.height) return -1
    return 0
  })
for (let i = 0; i < products.length; i++) {
  if(products[i + 1] !== undefined) {
    if(products[i].height !== products[i + 1].height) {
      select.push(products[i].height)
    }
  }else{
    select.push(products[i].height)
  }
}
}

{data && sel()}

  return (
    <div className="addTransaction">
      <div className="selectProduct"> 
        {data && data.map(product => (
          <div key={product.id} onClick={() => productHandler(product)} className={(productId === product.id ? 'btn productBtn' : 'btn')} >
            <img src={product.img} alt="" />
            <span>{product.title}</span>
          </div>
        )) 
        }
      </div>

      <div className="productsTitle">
      <h4>{productValue.title}</h4>
      <select className={productValue.title === 'opalobka' ? '' : 'hidden' } onChange={(e) => setHeight(e.target.value)} >
          <option value="all">Hammasi</option>
        {select.map((item, index) => (
          <option key={index} value={item}>{`${item} cm`}</option>         
        ))}
      </select>
      </div>
      <ul className="list">
          {productValue.title === 'opalobka' 
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
        (productValue.data && productValue.data.map(product => (
          <li key={product.id} >
            <div className="title" onClick={() => toggle(product.id, selected, setSelected)}>
                <p>{product.title}</p>
                <p>{product.amount - product.rent}</p>
            </div>
            <Form toggle={toggle} selected={selected} setSelected={setSelected} product={product} listPrdoucts={listProducts} setListProducts={setListProducts}/>
          </li>
          ) 
        )
        )
        }
      </ul>
      
      <AddingList 
      products={data} 
      allProduct={allProduct} productValue={productValue} listHistory={listHistory} setListHistory={setListHistory} listProducts={listProducts} setListProducts={setListProducts} customers={customers} />
    </div>
  );
}
