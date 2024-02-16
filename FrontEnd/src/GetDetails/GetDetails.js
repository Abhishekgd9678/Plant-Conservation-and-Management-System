import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, useSortBy, usePagination } from "react-table";
import TaxonView from "../views/TaxonView";
import ClimateRequirements from "../views/ClimateRequirements";
import { Link } from "react-router-dom";
import backgroundImage from '../../images/outline.jpg'

const GetDetails = () => {
  const [area, setArea] = useState("");
  const [fdata, setFdata] = useState([]);
  const [showtaxon, setShowtaxon] = useState(false);
  const [showclimate, setShowClimate] = useState(false);
  const [clickedid, setClickedId] = useState();
  const [userwithmoreplants, setUserWithMorePlants] = useState(null);
  const [fliterid, setFilterId] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    getAllinfo();
    getHighest();
  }, []);

  const getAllinfo = async () => {
    try {
      const response = await axios.get("http://localhost:3000/alldetails");
      setFdata(response.data);
    } catch (error) {
      console.error("Error fetching details :", error);
    }
  };

  const getHighest = async () => {
    const res = await axios.post("http://localhost:3000/highest");
    setUserWithMorePlants(res?.data[0]);
  };

  const filterData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/filter", {
        area: area,
      });
      setFdata(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const filteruser = async () => {
    const response = await axios.post("http://localhost:3000/userplants", {
      id: fliterid,
    });

    setFdata(response.data);
  };

  const flitername = async () => {
    const response = await axios.post("http://localhost:3000/filtername", {
      search: search,
    });
    console.log(response.data);
    setFdata(response.data[0]);
  };

  // Define your columns
  const columns = React.useMemo(
    () => [
      { Header: "Scientific name", accessor: "scientificname" },
      { Header: "Age", accessor: "age" },
      { Header: "Count", accessor: "count" },
      { Header: "Common Name", accessor: "commonname" },
      { Header: "Location", accessor: "location" },
      { Header: "Taxon", accessor: "" },
      { Header: "Climate Requirements", accessor: "" },
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
    setPageSize, 
  } = useTable(
    {
      columns,
      data: fdata,
      initialState: { pageIndex: 0, pageSize: 5 }, 
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      {showtaxon && <TaxonView setShowtaxon={setShowtaxon} id={clickedid} />}
      {showclimate && (
        <ClimateRequirements setShowClimate={setShowClimate} id={clickedid} />
      )}
      <div className="mx-20 flex gap-4">
        <div className="bg-green-200 rounded-lg p-6 flex justify-center items-center shadow-lg" >
          <form
            method="post"
            className="flex flex-col *:m-4"
            action="/GetDetails"
          >
            <div className="*:m-2">
              <label htmlFor="AreaName">Enter Area Name</label>
              <input
                className="border border-green-500 rounded-md px-2 py-1"
                type="text"
                id="AreaName"
                name="AreaName"
                onChange={(e) => setArea(e.target.value)}
              />
              <button
                type="button"
                onClick={filterData}
                className="m-2 rounded-lg p-2 bg-green-500 text-white hover:bg-green-600 transition duration-300"
              >
                Get Details
              </button>
            </div>
          </form>
        </div>
        <div className="bg-green-200 rounded-lg p-6 flex justify-center items-center shadow-lg">
          <div className="*:m-2">
            <label htmlFor="AreaName">Enter User id</label>
            <input
              className="border border-green-500 rounded-md px-2 py-1"
              type="text"
              id="AreaName"
              name="AreaName"
              onChange={(e) => {
                setFilterId(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={filteruser}
              className="m-2 rounded-lg p-2 bg-green-500 text-white hover:bg-green-600 transition duration-300"
            >
              Get Details
            </button>
          </div>
        </div>
        <div className="bg-green-200 rounded-lg p-6 flex justify-center items-center shadow-lg">
          <div className="*:m-2">
            <label htmlFor="AreaName">Enter Name</label>
            <input
              className="border border-green-500 rounded-md px-2 py-1"
              type="text"
              id="AreaName"
              name="AreaName"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={flitername}
              className="m-2 rounded-lg p-2 bg-green-500 text-white hover:bg-green-600 transition duration-300"
            >
              Get Details
            </button>
          </div>
        </div>
      </div>

      {fdata.length > 0 && (
        <div className="flex items-center justify-center">
          <div className="mx-auto w-full lg:w-[40rem] p-5 flex justify-center shadow-lg">
            {/* React-table */}
            <table
              {...getTableProps()}
              className="w-full table-auto text-center"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="bg-green-200 text-green-800 text-lg font-semibold"
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
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
                        return cell.column.Header === "Taxon" ? (
                          <td {...cell.getCellProps()} className="py-2">
                            <button
                              onClick={() => {
                                setShowtaxon(true);
                                setClickedId(row.original?.plantid);
                              }}
                              className="text-green-600 hover:text-green-700 transition duration-300"
                            >
                              View
                            </button>
                          </td>
                        ) : cell.column.Header === "Scientific name" ? (
                          <td {...cell.getCellProps()} className="py-2">
                            <Link
                              to={`/plant/${row.original.plantid}`}
                              className="text-green-600 hover:underline"
                            >
                              {cell.render("Cell")}
                            </Link>
                          </td>
                        ) : cell.column.Header === "Climate Requirements" ? (
                          <td {...cell.getCellProps()} className="py-2">
                            <button
                              onClick={() => {
                                setClickedId(row.original?.plantid);
                                setShowClimate(true);
                              }}
                              className="text-green-600 hover:text-green-700 transition duration-300"
                            >
                              View
                            </button>
                          </td>
                        ) : (
                          <td {...cell.getCellProps()} className="py-2">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
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
        <div className="flex items-center justify-center mt-4">
          <div className="pagination">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`m-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ${
                !canPreviousPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              {"Previous"}
            </button>{" "}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`m-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ${
                !canNextPage && "opacity-50 cursor-not-allowed"
              }`}
            >
              {"Next"}
            </button>{" "}
            <span className="text-green-800">
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
              className="border border-green-500 rounded-md px-2 py-1 mx-2"
            >
              {[5, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="text-center mt-4 text-green-800">
        User with highest count of plants:{" "}
        <span className="font-semibold">
          {userwithmoreplants?.username}
        </span>
      </div>
    </>
  );
};

export default GetDetails;
