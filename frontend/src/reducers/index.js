import {configureStore} from "@reduxjs/toolkit";


import ordersFetch from "./orders/orderAdminRed";
import productsFetch from "./products/getProductRed"
const store=configureStore({
    reducer:{
        ordersAdminFetch:ordersFetch,
        products:productsFetch
    }
})

export default store;