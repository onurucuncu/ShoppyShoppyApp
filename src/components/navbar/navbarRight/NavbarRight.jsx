import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
// import { RiLoginCircleFill, RiLogoutCircleFill } from "react-icons/ri";
// import { logout } from "../../../redux/userSlice";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { STATUS } from "../../../utils/status";

const NavbarRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts, itemCount } = useSelector((state) => state.carts);
  const usersTokenStatus = useSelector(
    (state) => state.usersToken.usersTokenStatus
  );

  console.log(carts, "carts");
  const first = localStorage.getItem('firstname')

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [dispatch, itemCount, carts]);

  return (
    <div className="flex items-center gap-8">
      <div onClick={() => navigate("login")}>
        <button
          className="flex items-center border px-5 py-2 bg-gray-200 rounded-full gap-2 text-2xl uppercase"
          type="submit"
        >
          {usersTokenStatus === STATUS.SUCCESS ?
          <>
            {first}
            <FaUserCheck size={28} />
          </>  
          : 
          <>
            <h1>LOGIN</h1>
            <FaUserPlus size={28} />
          </>
          }
        </button>
      </div>
      {/* <div onClick={handleLogout}>
        <button
          className="flex items-center border px-5 py-2 bg-red-200 rounded-full gap-2 text-2xl"
          type="submit"
        >
          LOGOUT <RiLogoutCircleFill size={28} />
        </button>
      </div> */}
      <div className="flex items-center border p-3 bg-gray-200 rounded-full">
        <input
          className="bg-gray-200 outline-none"
          type="text"
          placeholder="Search"
        />
        <FiSearch size={28} />
      </div>
      <MdFavoriteBorder size={28} />
      <div
        onClick={() => navigate("cart")}
        className="relative flex items-center justify-center cursor-pointer"
      >
        <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </div>
        <SlBasket size={28} />
      </div>
    </div>
  );
};

export default NavbarRight;
