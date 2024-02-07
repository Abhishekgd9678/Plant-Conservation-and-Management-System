import axios from 'axios';
import React, { useEffect, useState } from 'react'
import profile from "../../images/profile.png"

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import { useTable, useSortBy, usePagination } from "react-table";
import EditModal from '../edit/EditModal';

const Profile = () => {
    const navigate = useNavigate();
    const userpresent = useSelector(store=>store.user);
    const [show, setShow] = useState(false);

    const [updatedata,setUpdateData] = useState();

    const [fdata,setFdata] = useState([]);

    useEffect(()=>{
      if(!userpresent){
        navigate('/log');
        return ;
      }
      getData();
    },[show])

    const getData =async ()=>{
        const res= await axios.post("http://localhost:3000/userplants",{id:userpresent.userid});
        setFdata(res.data);
        console.log(res);
    }


   //table
   const columns = React.useMemo(
    () => [
      { Header: "Scientific name", accessor: "scientificname" },
      { Header: "Age", accessor: "age" },
      { Header: "Common Name", accessor: "commonname" },
      { Header: "Location", accessor: "location" },
      { Header: "Kingdom", accessor: "kingdom" },
      { Header: "Phylum", accessor: "phylum" },
      { Header: "Class", accessor: "class" },
      { Header: "Family", accessor: "family" },
      { Header: "Edit", accessor:"plantidy"}
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
      {show?<EditModal updatedata={updatedata} setShow={setShow} />:""}
      <div className='flex justify-between m-4 p-4' >
        <div>
          <img src={profile} className='w-52' />
        </div>
        <div className='flex flex-col text-2xl gap-4 p-4 m-4'>
          <h1>{userpresent?.username}</h1>
          <h1>{userpresent?.email}</h1>
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
        <div>
            <Link to='/contribute' >
                <h1 className='bg-blue-300 rounded-md'>
                    Add Plants
                </h1>
            </Link>
        </div>
    </div>
  )
}

export default Profile