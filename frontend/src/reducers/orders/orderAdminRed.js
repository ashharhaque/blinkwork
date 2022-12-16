import {createSlice} from "@reduxjs/toolkit";

const ordersSlice=createSlice({
    name:"orderAdminFetch",
    initialState:[],
    reducers:{
        fetchOrderAdmin:(state,action)=>{
            state=action.payload;
            return state;
        }
    }
});

export const {fetchOrderAdmin}=ordersSlice.actions;
export default ordersSlice.reducer;