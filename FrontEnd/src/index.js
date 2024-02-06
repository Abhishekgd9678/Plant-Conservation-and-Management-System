import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";

import Header from "./HomePage/Header";
import Body from "./HomePage/Body";
import GetDetails from "./GetDetails/GetDetails";
import Contribute from "./Conribute/Contribute";
import Login from "./account/login";

const App=()=>{
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
}


const Approuter=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Body/>
            
            },{
                path:"/GetDetails",
                element:<GetDetails/>
            },
            {
                path:"/Contribute",
                element:<Contribute/>
            }
        ]
    },
    {
        path:'/log',
        element:<Login />,
    }
]);






ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={Approuter}/>)