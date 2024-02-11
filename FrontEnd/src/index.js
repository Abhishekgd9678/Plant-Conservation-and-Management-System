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
import AdminLogin from "./AdminLogin";
import Admin from "./account/Admin";
import PlantData from "./GetDetails/PlantData";
import Action from "./account/Action";
import UserAction from "./account/UserAction";

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
            },
            {
                path:'/adminlog',
                element:<AdminLogin />
            },
            {
                path:'/adminprofile',
                element:<Admin />
            },
            {
                path:'/plant/:id',
                element:<PlantData />
            },
            {
                path:'/actionpage',
                element:<Action />
            },
            {
                path:'/useraction',
                element:<UserAction />
            }
        ]
    },
]);






ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={Approuter}/>)