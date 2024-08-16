import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

export const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productDetail: [],
  productDetailStatus: STATUS.IDLE,
};


export const getProducts = createAsyncThunk(
  "getproducts",
  async ({ category, sortById }) => {
    const response = await fetch(
      `https://fakestoreapi.com/products${
        category ? "/category/" + category : ""
      }${sortById ? "?sort=" + sortById : ""}`
    );
    const data = response.json();
    return data;
  }
);

// export const getCategoryProducts = createAsyncThunk(
//   "getcategoryproducts",
//   async ({ category, sortById }) => {
//     const response = await fetch(
//       `https://fakestoreapi.com/products/category/${category}${
//         sortById ? "?sort=" + sortById : ""
//       }`
//     );
//     const data = response.json();
//     return data;
//   }
// );


// export const getSortingByIdProducts = createAsyncThunk(
//   "getsortingbyidproducts",
//   async (sortById) => {
//     const response = await fetch(
//       `https://fakestoreapi.com/products?sort=${sortById}`
//     );
//     const data = response.json();
//     return data;
//   }
// );

export const getDetailProduct = createAsyncThunk(
  "getdetailproduct",
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAIL;
      })
      .addCase(getDetailProduct.pending, (state, action) => {
        state.productDetailStatus = STATUS.LOADING;
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        state.productDetailStatus = STATUS.SUCCESS;
        state.productDetail = action.payload;
      })
      .addCase(getDetailProduct.rejected, (state, action) => {
        state.productDetailStatus = STATUS.FAIL;
      })
      // .addCase(getCategoryProducts.pending, (state, action) => {
      //   state.productsStatus = STATUS.LOADING;
      // })
      // .addCase(getCategoryProducts.fulfilled, (state, action) => {
      //   state.productsStatus = STATUS.SUCCESS;
      //   state.products = action.payload;
      // })
      // .addCase(getCategoryProducts.rejected, (state, action) => {
      //   state.productsStatus = STATUS.FAIL;
      // })
      // .addCase(getSortingByIdProducts.pending, (state, action) => {
      //   state.productsStatus = STATUS.LOADING;
      // })
      // .addCase(getSortingByIdProducts.fulfilled, (state, action) => {
      //   state.productsStatus = STATUS.SUCCESS;
      //   state.products = action.payload;
      // })
      // .addCase(getSortingByIdProducts.rejected, (state, action) => {
      //   state.productsStatus = STATUS.FAIL;
      // });
  },
});

// Action creators are generated for each case reducer function
// export const { } = productSlice.actions

export default productSlice.reducer;
