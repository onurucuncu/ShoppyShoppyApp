import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCount} from "../../redux/cartSlice";

const CartComp = ({ cart }) => {
  const dispatch = useDispatch();

  const handleRemoveCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const increment = (id) => {
    dispatch(updateCount({ id, type: 'increment' }));
  };
  
  const decrement = (id) => {
    dispatch(updateCount({ id, type: 'decrement' }));
  };

  return (
    <div className="my-10 flex items-center justify-between border-b-4 pb-3">
      <img className="w-[150px] h-[150px]" src={cart?.image} alt="" />
      <div className="w-[476px]">
        <div className="text-xl font-bold">{cart?.title}</div>
        <div>{cart?.description}</div>
      </div>
      <div className="font-bold text-2xl">{cart?.price} TL </div>
      <button
        onClick={() => increment(cart?.id)}
        className="font-bold text-2xl"
      >
        +
      </button>
      <div className="font-bold text-2xl">{cart?.quantity}</div>
      <button 
      onClick={() => decrement(cart?.id)}
      className="font-bold text-2xl">
        -
      </button>
      <div
        onClick={() => handleRemoveCart(cart?.id)}
        className="bg-red-500 text-white w-[150px] text-2xl cursor-pointer rounded-md h-16 text-center flex items-center justify-center"
      >
        Delete Product
      </div>
    </div>
  );
};

export default CartComp;
