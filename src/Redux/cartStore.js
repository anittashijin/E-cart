import { configureStore } from '@reduxjs/toolkit'
import productSlice from './Slices/productSlice'
import WishlistSlice from './Slices/WishlistSlice'
import cartSlice from './Slices/cartSlice'



const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer : WishlistSlice,
        cartReducer : cartSlice
    }

})
  

export default cartStore