import {configureStore} from "@reduxjs/toolkit"
import userdata from "./userdata";
import adminSlice from "./adminSlice";


const store = configureStore({
    reducer:{
        user:userdata,
        admin:adminSlice,
    }
})

export default store ;