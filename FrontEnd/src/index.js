import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";

import Header from "./HomePage/Header";
import Body from "./HomePage/Body";
import GetDetails from "./GetDetails/GetDetails";
import Contribute from "./Conribute/Contribute";
import Login from "./Login";

import { Provider } from "react-redux";
import store from "./store/store";
import Profile from "./account/Profile";

const App=()=>{
    return (
        <>
        <Provider store={store} >
        <Header/>
        <Outlet/>
        </Provider >
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
            },
            {
                path:'/log',
                element:<Login />,
            },
            {
                path:'/account',
                element:<Profile />
            }
        ]
    },
]);






ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={Approuter}/>)