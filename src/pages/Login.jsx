import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersToken, logout } from "../redux/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { STATUS } from "../utils/status";
import alertify from "alertifyjs";
import { RiLogoutCircleFill } from "react-icons/ri";
import { HiMiniHome } from "react-icons/hi2";
import { clearCart } from "../redux/cartSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const userName = localStorage.getItem('userName')
  const firstName = localStorage.getItem('firstname')
  const lastName = localStorage.getItem('lastname')


  const usersTokenStatus = useSelector(
    (state) => state.usersToken.usersTokenStatus
  );

  const users = useSelector(
    state => state.usersToken.users
  )

  const handleSubmit = () => {
    dispatch(getUsersToken({ username, password })).then((response) => {
      if(response.payload.token) {
        localStorage.setItem('userName', username)
        window.location.reload()
      }
    });
    if (usersTokenStatus && usersTokenStatus === STATUS.SUCCESS) {
      return <Navigate to="/" />;
    }
  };

  const userLoginInfo = users.find((user) =>
    (user.username === userName)
  )

   useEffect(() => {
    if (userLoginInfo) {
      localStorage.setItem('firstname', userLoginInfo.name.firstname);
      localStorage.setItem('lastname', userLoginInfo.name.lastname);
    }
  }, [userLoginInfo]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart())
    localStorage.removeItem('userName')
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
  };

  

  if (usersTokenStatus && usersTokenStatus === STATUS.FAIL) {
    // (alertify.alert(''))
    alertify
      .dialog("alert")
      .set({ transition: "zoom", message: "Username or Password is wrong..." })
      .show();
  }

  useEffect(() => {
    if(usersTokenStatus === STATUS.SUCCESS) {
      dispatch(getUsers())
    }
  },[dispatch, usersTokenStatus])

  
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className=" mx-auto mt-20 border rounded-lg px-20 py-10 bg-gray-300 w-[700px] h-[400px]"
    >
      {usersTokenStatus === STATUS.SUCCESS ?
      <div className="flex flex-col items-center gap-10">
      <div className="flex gap-5 items-center justify-center text-4xl ">
        Welcome : <h1 className="text-4xl uppercase">{firstName} {lastName}</h1>
      </div>
      <div onClick={handleLogout}>
        <button
          className="flex items-center justify-center border px-5 py-2 bg-red-200 rounded-full gap-2 text-2xl"
          type="submit"
        >
          LOGOUT <RiLogoutCircleFill size={28} />
        </button>
      </div>
      <div onClick={() => navigate('/')}>
      <button className="flex items-center justify-center border px-5 py-2 bg-red-200 rounded-full gap-2 text-2xl">Go Home Page <HiMiniHome size={28} /></button>
      </div>
      </div> 
       :
      <>
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          autoComplete="current-username"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          autoComplete="current-password"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      </>
       }

      
      
      
    </form>
  );
};

export default Login;
