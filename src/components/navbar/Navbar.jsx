import React from 'react'
import NavbarLeft from './navbarLeft/NavbarLeft'
import NavbarRight from './navbarRight/NavbarRight'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between my-3'>
      <NavbarLeft />
      <NavbarRight />
    </div>
  )
}

export default Navbar