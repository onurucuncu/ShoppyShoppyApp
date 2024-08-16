import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts
} from "../../redux/productSlice";
import Loading from "../Loading";
import Product from "./Product";
import ReactPaginate from "react-paginate";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaArrowDown19, FaArrowDown91 } from "react-icons/fa6";

const Products = ({ category, sort, sortById, setSortById }) => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const changeIdSort = () => {
    setSortById((prev) => (prev === "" ? "asc" : prev === "asc" ? "desc" : prev === "desc" ? "asc" : ""));

    // if(sortById === 'asc') {
    //   return setSortById('desc')
    // } else {
    //   return setSortById('asc')
    // }
  };
  console.log(sortById);

  // console.log(products, 'products')
  // console.log(productsStatus, 'productsStatus')
  // console.log(sort, 'sort')

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(getProducts({ category, sortById }));
  }, [dispatch, category, sortById]);

  // useEffect(() => {
  //   dispatch(getSortingByIdProducts(sortById));
  // }, [dispatch, sortById]);

  const [toggled, setToggled] = useState(false);

  return (
    <div className='w-5/6 bg-gray-100 max-h-screen'>
      <div className="flex items-center justify-center gap-2 my-3 cursor-pointer">
        <button className="bg-yellow-500 w-[200px] rounded-md text-black text-xl font-bold p-2">
          {toggled ? "Table List" : "Products List"}
        </button>
        <RxDashboard size={40} onClick={() => setToggled(!toggled)} />
      </div>
      {productsStatus === "LOADING" ? (
        <Loading />
      ) : toggled ? (
        <div className="cursor-pointer">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1050 }} aria-label="simple table">
              <TableHead className="text-5xl">
                <TableRow>
                  <TableCell sx={{ fontSize: 18, fontWeight: "bold" }} align="center">Image</TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: "bold" }} align="center">Title</TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: "bold" }} align="center" onClick={changeIdSort}>
                    <span className="flex items-center">Id {sortById === "asc" ? <FaArrowDown19 size={20}className="ms-3" /> : <FaArrowDown91 size={20} className="ms-3" />} </span>
                  </TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: "bold" }} align="center">Price</TableCell>
                  <TableCell sx={{ fontSize: 18, fontWeight: "bold" }} align="center">Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems
                  ?.sort((a, b) =>
                    sort === "inc" && sortById === ""
                      ? a.price - b.price
                      : sort === "dec" && sortById === ""
                      ? b.price - a.price
                      : null
                  )
                  .map((row, i) => (
                    <TableRow
                      onClick={() => navigate(`products/${row?.id}`)}
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <img
                          className="w-[200px] h-[200px] m-auto p-2"
                          src={row.image}
                          alt="pics"
                        />
                      </TableCell>

                      <TableCell
                        sx={{ fontSize: 18, fontWeight: "bold" }}
                        align="center"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell sx={{ fontSize: 18 }} align="center">
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: 24 }} align="center">
                        {row.price} TL
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        {row.category}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap items-center justify-between">
            {currentItems
              ?.sort((a, b) =>
                sort === "inc"
                  ? a.price - b.price
                  : sort === "dec"
                  ? b.price - a.price
                  : null
              )
              .map((product, i) => (
                <Product key={i} product={product} />
              ))}
          </div>
          <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
