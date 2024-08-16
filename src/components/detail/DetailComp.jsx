import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import alertify from 'alertifyjs'


const DetailComp = ({productDetail}) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(0)

  const decrement = () => {
    if(quantity > 0) setQuantity(quantity - 1)
  }

  const increment = () => {
    if(quantity < productDetail?.rating?.count) setQuantity(quantity + 1)
    
  }

  const addBasket = () => {
    if(quantity > 0) {
      dispatch(addToCart({id: productDetail?.id, title: productDetail?.title, description: productDetail?.description, image: productDetail?.image, price: productDetail?.price, quantity: quantity}))
    } else {
      return alertify.alert('Wrong Amount...', 'Please Chose Amount of Product!');
    }
    
  }

  return (
    <div className='flex gap-10 my-10'>
      <img className='w-[500px] h-[500px]' src={productDetail?.image} alt="" />
      <div className='my-auto'>
         <div className='text-4xl font-bold my-2'>{productDetail?.title}</div>
         <div className='text-xl my-2'>{productDetail?.description}</div>
         <div className='text-3xl font-bold my-2'>{productDetail?.price} <span className='text-sm'>TL</span></div>
         <div className='text-red-600 font-bold'>Rating : {productDetail?.rating?.rate}</div>
         <div className='text-red-600 font-bold'>Count : {productDetail?.rating?.count}</div>
         <div className='flex items-center my-5'>
          <div onClick={decrement} className='text-5xl cursor-pointer'>-</div>
          <input className='text-black bg-white text-center text-3xl w-[150px]' type="text" value={quantity} />
          <div onClick={increment} className='text-4xl cursor-pointer'>+</div>
         </div>
         <div onClick={addBasket} className='border border-gray-500 w-[200px] bg-gray-200 cursor-pointer text-center my-2 h-16 py-4 rounded-md text-2xl font-bold'>Add Cart</div>
      </div>
    </div>
  )
}

export default DetailComp