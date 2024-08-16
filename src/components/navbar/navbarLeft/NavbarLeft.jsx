import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarLeft = () => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate('')} className='text-6xl font-extrabold cursor-pointer'>ShoppyShoppy</div>
  )
}

export default NavbarLeft