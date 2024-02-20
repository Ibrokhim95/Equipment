import React, {useState} from 'react'
// import {products} from "../Data"
import Form from './Form';
import AddingList from './AddingList';

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
    const filtered = data.filter(item => item.height === height)
    if(height === 'all'){
      allProduct = data
    } else {
      allProduct = filtered
    }
  } 
  filterData() 
  // allProduct.sort((a,b) => {
  //   if(a.length > b.length) return 1
  //   if(a.length < b.length) return -1
  //   return 0
  // })

let select = []
for (let i = 0; i < data.length; i++) {
  if(data[i + 1] !== undefined) {
    if(data[i].height !== data[i + 1].height) {
      select.push(data[i].height)
    }
  }else{
    select.push(data[i].height)
  }
}

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
      <select className={productValue.title === 'opalobka' ? '' : 'hidden' } onChange={(e) => setHeight(e.target.value)} >
          <option value="all">Hammasi</option>
        {select.map(item => (
          <option key={item} value={item}>{item }cm</option>         
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
