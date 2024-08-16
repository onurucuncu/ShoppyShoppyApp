import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
  itemCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;
            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },
    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },
    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
    getCartTotal: (state) => {
      // console.log(state);
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.price * cartItem.quantity);
      }, 0);
      state.itemCount = state.carts.length;
    },
    updateCount: (state, action) => {
      const { id, type } = action.payload;
      const selectedItem = state.carts.find((item) => item.id === id);

      if (selectedItem) {
        const updatedCarts = state.carts.map((item) => {
          if (item.id === id) {
            let newQuantity =
              type === "increment" ? item.quantity + 1 : item.quantity - 1;
            // Ensure quantity doesn't go below 0
            newQuantity = Math.max(0, newQuantity);

            return {
              ...item,
              quantity: newQuantity,
              totalPrice: item.price * newQuantity,
            };
          }
          return item;
        });

        state.carts = updatedCarts;
        storeInLocalStorage(state.carts);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  getCartTotal,
  updateCount,
} = cartSlice.actions;
export default cartSlice.reducer;
