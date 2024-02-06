import {configureStore} from "@reduxjs/toolkit"
import userdata from "./userdata";


const store = configureStore({
    reducer:{
        user:userdata,
    }
})

export default store ;