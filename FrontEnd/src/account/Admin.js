import React from 'react'
import profile from "../../images/1.jpg"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useTable, useSortBy, usePagination } from "react-table";
import axios from 'axios';
import { removeAdmin } from '../store/adminSlice';
import EditUser from '../edit/EditUser';
import ShowMsg from './ShowMsg';
const Admin = () => {
  const dispatch = useDispatch();
  const admin = useSelector(store=>store.admin);
  const [fdata,setFdata] = useState([]);
  const [msg,setMsg] = useState();
  const [showmsg,setShowMsg] = useState(false);
  const [plantid,setPlantid] = useState();
  const [userid,setUserid] = useState();
  const [updatedata,setUpdateData] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    getData();
  },[show])

  useEffect(()=>{
    if(admin==null){
      navigate('/adminlog');
      return ;
    }
    getMessage();
  },[])

  const getMessage =async ()=>{
    const res= await axios.get("http://localhost:3000/adminmessage");
      setMsg(res?.data[0]?.message);
      setPlantid(res?.data[0]?.last_updated_plantid);
      setUserid(res?.data[0]?.last_updated_userid)
  }

  const getData =async ()=>{
      const res= await axios.post("http://localhost:3000/adminprofile",{});
      setFdata(res.data);
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
          <h1 

          className='flex items-center' >
            <div
                        onClick={()=>{
                          console.log("clicked")
                          setShowMsg(true);
                        }}            
            >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          </div>
          {msg}
          </h1>
          {showmsg===true ? <ShowMsg setShowMsg={setShowMsg} plantid={plantid} userid={userid} /> : console.log(showmsg)}
          <h1>{admin?.email}</h1>
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