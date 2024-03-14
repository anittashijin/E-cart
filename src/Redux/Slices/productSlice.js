import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts =createAsyncThunk('product/fetchProducts',async()=>{
  
    const response=await axios.get("https://dummyjson.com/products")
    sessionStorage.setItem("allproducts",JSON.stringify(response.data.products))
    // console.log(response.data.products);
    return response.data.products
})
const productSlice=createSlice({
    name:'product',
    initialState:{
        allproducts:[],
        allproductsDummy : [],
        error:'',
        loading:false
    },
    reducers:{
        searchProduct : (state,action)=>{
            state.allproducts=state.allproductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }
    },
    extraReducers:(builder)=>{
         builder.addCase(fetchProducts.fulfilled,(state,action)=>{
         state.loading=false
         state.allproducts=action.payload
         state.allproductsDummy=action.payload
         state.error=""
         })
         builder.addCase(fetchProducts.pending,(state,action)=>{
            state.loading=true
            state.allproducts=[]
            state.error=""
            })
            builder.addCase(fetchProducts.rejected,(state,action)=>{
                state.loading=false
                state.allproducts=[]
                state.error="API call failed"
                })
    }
}
)
export const {searchProduct}=productSlice.actions
export default productSlice.reducer