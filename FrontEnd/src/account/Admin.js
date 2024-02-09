import React from 'react'
import profile from "../../images/profile.png"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useTable, useSortBy, usePagination } from "react-table";
import axios from 'axios';
import { removeAdmin } from '../store/adminSlice';
import EditUser from '../edit/EditUser';
const Admin = () => {
  const dispatch = useDispatch();
  const admin = useSelector(store=>store.admin);
  const [fdata,setFdata] = useState([]);
  const [updatedata,setUpdateData] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(admin==null){
      navigate('/adminlog');
      return ;
    }
    getData();
  },[show])

  const getData =async ()=>{
      const res= await axios.post("http://localhost:3000/adminprofile",{});
      setFdata(res.data);
      console.log(res);
  }


 //table
 const columns = React.useMemo(
  () => [
    { Header: "User Id", accessor: "userid" },
    { Header: "Name", accessor: "username" },
    { Header: "Mail", accessor: "email" },
    { Header: "Password", accessor: "password" },
    { Header: "Edit" , accessor:"id"} 
  ],
  []
);

// Use react-table hooks for sorting and pagination
const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  state: { pageIndex, pageSize },
  gotoPage,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  pageCount,
  setPageSize, // Add this line to define setPageSize
} = useTable(
  {
    columns,
    data: fdata,
    initialState: { pageIndex: 0, pageSize: 5 }, // You can set the initial page size here
  },
  useSortBy,
  usePagination
); 

  return (
    <div>
      {show?<EditUser updatedata={updatedata} setShow={setShow} />:""}
        <div className='flex justify-between m-4 p-4' >
        <div>
          <img src={profile} className='w-52' />
        </div>
        <div className='flex flex-col text-2xl gap-4 p-4 m-4'>
          <h1>{admin?.email}</h1>
          <h1 className='bg-red-200 rounded-md' 
          onClick={()=>{
            dispatch(removeAdmin(null));
            navigate('/');
          }}
          >logout</h1>
        </div>
      </div>
      <div>
        <div>
          User Plants
        </div>
        <div>
        {fdata.length > 0 && (
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full lg:w-[40rem] bg-white p-4 rounded-lg flex justify-center">
            {/* React-table */}
            <table {...getTableProps()} className="w-full table-auto text-center ">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-gray-200 text-gray-700 text-xl font-semibold"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="py-2 min-w-[150px]"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <span className="ml-1">🔽</span>
                            ) : (
                              <span className="ml-1">🔼</span>
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      className="bg-white border-b border-gray-200"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return cell.column.Header==="Edit" ?
                        (
                        <td {...cell.getCellProps()} className="py-2">
                          <button
                            onClick={()=>{
                              setUpdateData(row.original);
                              setShow(true);
                              console.log(row.original);
                            }}
                          >Update</button>
                        </td>
                        )
                        :
                        (
                        <td {...cell.getCellProps()} className="py-2">
                          {cell.render("Cell")}
                        </td>
                      )})}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {fdata.length > pageSize && (
        <div className="pagination flex justify-center mb-20 *:p-4">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"Previous"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {"Next"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
        </div>
      </div>
      <div className='flex h-48'></div>
    </div>
  )
}

export default Admin