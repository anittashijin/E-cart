import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../Redux/Slices/WishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  





function View() {
  const cart = useSelector(state=>state.cartReducer)
  const wishlist=useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
const[product,setProduct]=useState({})
const{id} = useParams()
useEffect(()=>{
  if(sessionStorage.getItem("allproducts")){
    const allproducts=JSON.parse
    (sessionStorage.getItem("allproducts"))
setProduct(allproducts.find(item=>item.id==id))
    
  }
},[])
const handleWishlist =(product)=>{
  if(wishlist?.includes(product)){
    toast.info("ITEM ALREADY IN YOUR WISHLIST")
  }else{
    dispatch(addWishlistItem(product))
  }
}
const handleCart = (product)=>{
  const existingProduct = cart?.find(item=>item.id==product.id)
  if(existingProduct){
    dispatch(addToCart(product))
    toast.success("Products added to cart")
  }else{
    dispatch(addToCart(product))

  }
} 

  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className='container'>
      <div className="row mb-5 align-items-center">
        <div className="col-lg-6">
          <img width={'400px'} height={'400px'} className='img-fluid' src={product?.thumbnail} alt="" />
        </div>
        <div className="col-lg-6">
          <h5>PID: {product?.id}</h5>
           <h1>{product?.title}</h1>
          <h3 className='text-primary'>${product?.price}</h3>
          <p style={{textAlign:'justify'}}><b>Description</b> :{product?.description}</p>
           <div className='d-flex justify-content-between'>
            <button  onClick={()=>handleWishlist(product)} className='btn btn-outline-dark'><i className='fa-solid fa-heart text-primary'></i>Add to wishlist</button>
            <button onClick={()=>handleCart(product)} className='btn btn-outline-dark'><i class="fa-solid fa-cart-plus text-success"></i>Add to cart</button>
           </div>

        </div>
      </div>

    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default View