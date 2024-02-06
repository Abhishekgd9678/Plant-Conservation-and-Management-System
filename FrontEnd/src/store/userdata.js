import { createSlice } from "@reduxjs/toolkit";

const Userdata = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeuser:(state,action)=>{
            return null;
        }
    }
})

export const {addUser,removeuser} = Userdata.actions;

export default Userdata.reducer ;