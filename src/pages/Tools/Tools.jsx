import React from 'react'
import './Tools.css'
import {FaPlus, FaMinus, FaAngleDown, FaAngleUp} from 'react-icons/fa'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

export default function Tools({data, toggle, selected, setSelected, forceUpdate}) {
  const [item, setItem] = useState(null)
  const [newProducts, setNewProducts] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [image, setImage] = useState('')
  const [productsTitle, setProductsTitle] = useState('')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [newProduct, setNewProduct] = useState(false)
  const [del, setDel] = useState(false)
  const [edit, setEdit] = useState(false)
  const [product, setProduct] = useState({})
  const [amount, setAmount] = useState('')
  
  const fileEl = (e) => {
    const fr = new FileReader() 
    fr.readAsDataURL(e)
    fr.addEventListener('load', () => {
      setImage(fr.result)
    })
  }

  const addNewProducts = () => {
    forceUpdate()
    const thisProducts = {
      id: uuidv4(), 
      title: newTitle.toLowerCase(),
      value: newTitle.toLowerCase(),
      img: image,
      data: []
    }
      data.push(thisProducts)
      localStorage.setItem("products", JSON.stringify(data))
      setNewProducts(false)
  } 
  
  const delProducts = () => {
      forceUpdate()
    if(productsTitle === 'products') {
      const filter = data.filter(products => products.id !== item.id)
      localStorage.setItem("products", JSON.stringify(filter))
    }else if(productsTitle === 'product') {
      const updProducts = data.filter(products => products.title.toLowerCase() !== item.category.toLowerCase())
      const thisProducts = data.find(products => products.title.toLowerCase() === item.category.toLowerCase())
      const updProduct = thisProducts.data.filter(product => product.title !== item.title)
      thisProducts.data = updProduct
      updProducts.push(thisProducts)
      localStorage.setItem("products", JSON.stringify(updProducts))
    }
    setDel(false)
  }

  const addNewProduct = () => {
    forceUpdate()
    const updProducts = data.filter(item => item.title.toLowerCase() !== productsTitle.toLowerCase())
    const thisProducts = data.find(item => item.title.toLowerCase() === productsTitle.toLowerCase())

    const thisProduct = {
      id: uuidv4(), 
      category: productsTitle.toLowerCase(),
      amount: 0,
      rent: 0,
    }
    if(productsTitle.toLowerCase() === 'opalobka'){
      thisProduct.title = `${height}x${length}`
      thisProduct.height = height,
      thisProduct.length = length,
      thisProduct.select = ['metr', 'dona']
    }else if(productsTitle.toLowerCase() === 'lesa'){
      thisProduct.title = newTitle.toLowerCase(),
      thisProduct.select = ['dona', 'komp']
    }else if(productsTitle.toLowerCase() === 'boshqalar'){
      thisProduct.title = newTitle.toLowerCase(),
      thisProduct.select = ['kun', 'soat']
    }else{
      thisProduct.title = newTitle.toLowerCase(),
      thisProduct.select = ['dona']
    }
    thisProducts.data.push(thisProduct)
    updProducts.push(thisProducts)
    localStorage.setItem("products", JSON.stringify(data))
    setNewTitle('')
    setProductsTitle('')
    setNewProduct('')
    setHeight('')
    setLength('')
  }

  const editProduct = () => {
    forceUpdate()
    const thisProducts = data.find(item => item.title.toLowerCase() === product.category.toLowerCase())
    const thisProduct = thisProducts.data.find(item => item.title === product.title)
    thisProduct.amount += Number(amount)
    localStorage.setItem("products", JSON.stringify(data))
    setEdit(false)
    setAmount('')
  }

  data.sort((a, b) => {
    if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
    if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
    return 0
  })

  return (
    <div className='tools card'>
      <h3 >Uskunalar</h3>
      {edit && 
      <div className='editTools'>
        <div className="card">
        <p>Mahsulot sonini o'zgartirmoqchimisiz?</p>
        <input type="number" placeholder='0' value={amount} onChange={e => setAmount(e.target.value)} />
        <div className="btns">
          <button onClick={editProduct} >Ha</button>
          <button className='refuse' onClick={() => setEdit(false)} >Yo'q</button>
        </div>
        </div>
      </div> }
      {newProducts && 
      <div className="editTools">
        <div className="card">
          <p>Yangi mahsulot!</p>
          <label htmlFor="">
            <span>Nomi: </span> <br />
            <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder='Mahsulot nomi...' />
          </label> 
          <label htmlFor="">
            <span>Rasm: </span><br />
            <input type={"file"} onChange={(e) => fileEl(e.target.files[0])} name="" id="" />
          </label>
          <div className="btns">
            <button onClick={addNewProducts} >Ha</button>
            <button className='refuse' onClick={() => setNewProducts(false)} >Yo'q</button>
          </div>
        </div>
      </div>
      }
      {del && 
      <div className="editTools">
        <div className="card">
        <p>Ushbu mahsulotni o'chirmoqchimisiz?</p>
        
        <div className="btns">
          <button onClick={delProducts} >Ha</button>
          <button className='refuse' onClick={() => setDel(false)} >Yo'q</button>
        </div>
      </div>
      </div>
      }
      {newProduct && 
      <div className="editTools">
        <div className="card">
          <p>Yangi mahsulot!</p>
          { productsTitle.toLowerCase() === 'opalobka' ? 
          <div className="inputs">
            <label htmlFor="">
              <span>Eni: </span>
              <span><input type="number" value={height} onChange={e => setHeight(e.target.value)} name="" id="" /> sm</span>
            </label>
            <label htmlFor="">
              <span>Bo'yi: </span>
              <span><input type="number" value={length} onChange={e => setLength(e.target.value)} name="" id="" /> m</span>
            </label>
          </div> : <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder='Mahsulot nomi...' />}
          <div className="btns">
            <button onClick={addNewProduct} >Ha</button>
            <button className='refuse' onClick={() => setNewProduct(false)} >Yo'q</button>
          </div>
        </div>
      </div>
      }
      <ul>
      {data.map(products => (
          <li key={products.title} >
            <div className="head card" >
              <span className='title' onClick={() => toggle(products.id, selected, setSelected)} >{products.title} {selected === products.id ? <FaAngleUp/> : <FaAngleDown/>}</span>
              
              <div className="btns" onClick={() => (setDel(true), setItem(products), setProductsTitle('products'))} >
                <span className="delTool"><FaMinus/></span>
              </div>
            </div>
            {selected === products.id && 
            <ul className="product card">
              {products.data.map(item => (
                <li key={item.id}  onTouchMove={(e) => console.log(e)}  >
                  <span>{item.title}</span>
                  <div className="edit">
                    <div className='amounts' onDoubleClick={() => (setProduct(item), setEdit(true))} onTouchEnd={() => (setProduct(item), setEdit(true))} >
                      <div className='amount' ><span className='info' >Jami:</span><span className='light' >{item.amount}</span></div>
                      <div className='amount' ><span className='info' >Ijarada:</span><span className='light' >{item.rent}</span></div>
                      <div className='amount' ><span className='info' >Qoldi:</span><span>{item.amount - item.rent}</span></div>
                    </div>
                    <div className="btns" onClick={() => (setDel(true), setItem(item), setProductsTitle('product'))} >
                      <span className="delTool"><FaMinus/></span>
                    </div>
                  </div>
                </li>
                
              ))}
              <li className='addNew' >
                <button onClick={() => (setNewProduct(true), setProductsTitle(products.title))} >+</button>
              </li>
            </ul>}
          </li>
        ))}
          <li className='addNew' >
            <button onClick={() => setNewProducts(true)} ><span>+</span> Yangi Mahsulot</button>
          </li>
      </ul>
    </div>
  )
}
