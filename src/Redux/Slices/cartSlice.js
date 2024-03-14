import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name : 'cart',
    initialState : [],
    reducers :{
        addToCart : (state,action)=>{
            const existingproduct=state.find(item=>item.id==action.payload.id)
            if(existingproduct){
                const remainingProduct=state.filter(item=>item.id!=existingproduct.id)
                existingproduct.quantity++
                existingproduct.totalPrice=existingproduct.quantity*existingproduct.price
                state=[...remainingProduct,existingproduct]
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removeCartItem : (state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        incQuantity : (state,action)=>{
            const existingproduct = state.find(item=>item.id==action.payload)
            existingproduct.quantity++
            existingproduct.totalPrice=existingproduct.quantity*existingproduct.price
            const remainingProduct=state.filter(item=>item.id!=existingproduct.id)
            state=[...remainingProduct,existingproduct]
        },
        decQuantity :
        (state,action)=>{
            const existingproduct = state.find(item=>item.id==action.payload)
            existingproduct.quantity--
            existingproduct.totalPrice=existingproduct.quantity*existingproduct.price
            const remainingProduct=state.filter(item=>item.id!=existingproduct.id)
            state=[...remainingProduct,existingproduct]
        },
        emptyCart : (state,action)=>{
         return   state = []
        }
    }
})
export const { addToCart,removeCartItem,incQuantity,decQuantity,emptyCart }=cartSlice.actions
export default cartSlice.reducer