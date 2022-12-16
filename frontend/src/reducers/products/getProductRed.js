import {createSlice} from "@reduxjs/toolkit";

const productsSlice=createSlice({
    name:"fetchProducts",
    initialState:[],
    reducers:{
        fetchProducts:(state,action)=>{
            state=action.payload;
            return state;
        }
    }
});

export const {fetchProducts}=productsSlice.actions;
export default productsSlice.reducer;