import axios from 'axios'
import {WISHLIST_ADD_ITEM,
    WISLIST_REMOVE_ITEM,
     } from '../constants/wishlistConstants'

export const addToWishList = (id,qty=1) =>async (dispatch, getState) => {
    const {data}=await axios.get(`/api/products/${id}`)

    dispatch({
        type:WISHLIST_ADD_ITEM,
        payload:{
            product: data._id,
            name:data.name, 
            image:data.image,
            price:data.price, 
            countInStock:data.countInStock,
            discountPrice:data.discountPrice,
            qty
        }
    })
    localStorage.setItem('wishlist',JSON.stringify(getState().wislist.wishlist))
}

export const removeFromWislist=(id)=>(dispatch,getState)=>{

    dispatch({
        type:WISLIST_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('wishlist',JSON.stringify(getState().wislist.wishlist))
}