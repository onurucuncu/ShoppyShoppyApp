import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartTotal } from '../redux/cartSlice'
import CartComp from '../components/cart/CartComp'

const Cart = () => {
  const dispatch = useDispatch()
  const {carts, totalAmount} = useSelector(state => state.carts)


  useEffect(() => {
    dispatch(getCartTotal())
  },[dispatch, carts])
  return (
    <div>
      <div className='bg-gray-500 text-white w-[500px] mx-auto mt-10 text-2xl cursor-pointer rounded-md h-16 flex items-center justify-center'>Cart Detail</div>
      {
         carts?.length > 0 ? <div>
            {
               carts?.map((cart, i) => (
                  <CartComp key={i} cart={cart} />
               ))
            }
            <div className='flex items-center justify-end text-2xl'>TOTAL PRICE : <span className='text-3xl font-bold ml-3'>{totalAmount} TL</span></div>
         </div> :
         <div className='py-10 mt-10 text-6xl font-extrabold bg-gray-600 rounded-lg text-red-300 flex items-center justify-center'>
            Empty Cart
         </div>
      }
    </div>
  )
}

export default Cart