import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/categorySlice'

const Category = ({setCategory}) => {
   const dispatch = useDispatch()
   const { categories } = useSelector(state => state.categories)

   // console.log(categories, 'categories')

   useEffect(() => {
      dispatch(getCategories())
   },[dispatch])
   
  return (
    <div className='w-1/6 bg-gray-100 max-h-screen'>
      <div className='bg-yellow-500 rounded-md text-black text-xl font-bold text-center p-2 my-3'>CATEGORY</div>
      {
         categories?.map((category,i) => (
            <div onClick={() => setCategory(category) } className='py-1 px-4 text-lg first-letter:uppercase cursor-pointer hover:bg-gray-200 ' key={i}>{category}</div>
         ))
      }
    </div>
  )
}

export default Category