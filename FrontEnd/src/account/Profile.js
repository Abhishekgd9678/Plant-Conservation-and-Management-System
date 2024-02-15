import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTable, useSortBy, usePagination } from 'react-table';
import { HiOutlineEye, HiOutlinePencilAlt } from 'react-icons/hi'; 
import profile from "../../images/1.jpg";
import EditModal from '../edit/EditModal';
import ClimateRequirements from '../views/ClimateRequirements';
import TaxonView from '../views/TaxonView';
import EditClimate from '../edit/EditClimateR';

const Profile = () => {
    const navigate = useNavigate();
    const userpresent = useSelector(store => store.user);
    const admin = useSelector(store => store.admin);
    const [show, setShow] = useState(false);
    const [clickedid, setClickedId] = useState();
    const [showtaxon, setShowtaxon] = useState(false);
    const [showclimate, setShowClimate] = useState(false);
    const [showclimateupdate, setShowClimateUpdate] = useState(false);
    const [updatedata, setUpdateData] = useState();
    const [fdata, setFdata] = useState([]);

    useEffect(() => {
        if (!userpresent && !admin) {
            navigate('/log');
        } else if (admin) {
            navigate('/adminprofile');
        } else {
            getData();
        }
    }, [show, showclimateupdate]);

    const getData = async () => {
        const res = await axios.post("http://localhost:3000/userplants", { id: userpresent.userid });
        setFdata(res.data);
    };

 
    const columns = React.useMemo(
        () => [
            { Header: "Scientific name", accessor: "scientificname" },
            { Header: "Age", accessor: "age" },
            { Header: "Common Name", accessor: "commonname" },
            { Header: "Location", accessor: "location" },
            { Header: "Count", accessor: "count" },
            { Header: "Expected Lifetime", accessor: "expected_lifetime" },
            {
                Header: "Taxon",
                accessor: "",
                Cell: ({ row }) => (
                    <button
                        onClick={() => {
                            setShowtaxon(true);
                            setClickedId(row.original?.plantid);
                        }}
                        className="text-green-500 hover:text-green-700 transition duration-300"
                    >
                        <HiOutlineEye />
                    </button>
                )
            },
            {
                Header: "Climate Requirements",
                accessor: "",
                Cell: ({ row }) => (
                    <button
                        onClick={() => {
                            setClickedId(row.original?.plantid);
                            setShowClimate(true);
                        }}
                        className="text-green-500 hover:text-green-700 transition duration-300"
                    >
                        <HiOutlineEye />
                    </button>
                )
            },
            {
                Header: "Edit",
                accessor: "",
                Cell: ({ row }) => (
                    <button
                        onClick={() => {
                            setUpdateData(row.original);
                            setShow(true);
                        }}
                        className="text-green-500 hover:text-green-700 transition duration-300"
                    >
                        <HiOutlinePencilAlt />
                    </button>
                )
            }
        ],
        []
    );


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
        setPageSize
    } = useTable(
        {
            columns,
            data: fdata,
            initialState: { pageIndex: 0, pageSize: 5 } 
        },
        useSortBy,
        usePagination
    );

    return (
        <div>
            {show ? <EditModal updatedata={updatedata} setShow={setShow} /> : ""}
            {showtaxon && <TaxonView setShowtaxon={setShowtaxon} id={clickedid} />}
            {showclimate && <ClimateRequirements setShowClimate={setShowClimate} id={clickedid} />}
            {showclimateupdate && <EditClimate setShowClimateUpdate={setShowClimateUpdate} id={clickedid} />}
            <div className="flex justify-between items-center m-4 p-4 bg-white rounded-lg shadow-md">
    <div>
        <img src={profile} className="w-52 rounded-full" alt="Profile" />
    </div>
    <div className="flex flex-col gap-2"  >
        <h1 className="text-3xl font-bold">{userpresent?.username}</h1>
        <p className="text-gray-600">{userpresent?.email}</p>
        {admin && <p className="text-gray-600">{admin.email}</p>}
    </div>
</div>

            <div>
                
                <div>
                    {fdata.length > 0 && (
                        <div className="flex items-center justify-center">
                            <div className="mx-auto w-full lg:w-[40rem] bg-white p-4 rounded-lg flex justify-center">
                           
                                <table {...getTableProps()} className="w-full table-auto text-center ">
                                    <thead>
                                        {headerGroups.map((headerGroup) => (
                                            <tr
                                                {...headerGroup.getHeaderGroupProps()}
                                                className="bg-green-200 text-gray-700 text-xl font-semibold"
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
                                                    {row.cells.map((cell) => (
                                                        <td {...cell.getCellProps()} className="py-2">
                                                            {cell.render("Cell")}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                
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
            <div className='flex justify-center'>
            <Link to='/contribute'>
    <h1 className='bg-green-300 rounded-md  text-lg px-4 py-2  '>
        Add Plants
    </h1>
</Link>


            </div>
        </div>
    );
};

export default Profile;
