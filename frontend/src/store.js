import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer, productReviewCreateReducer, productTopRatedReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,userListReducer,userUpdateReducer, addressListReducer  } from './reducers/userReducers'
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer,orderDeliverReducer, orderCancelReducer} from './reducers/orderReducer'
import { addressDeleteReducer, addressDetailsReducer } from './reducers/addressReducers'
import { categoryListReducer } from './reducers/categoryReducers'
import { addNewOfferReducer, offerDeleteReducer, offerListReducer } from './reducers/offerReducer'
import { wishlistReducer } from './reducers/wishlistReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  addressList:addressListReducer,
  orderCreate:orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList:orderListReducer,
  orderDeliver: orderDeliverReducer,
  orderCancel: orderCancelReducer,
  addressDetails: addressDetailsReducer,
  addressDelete:addressDeleteReducer,
  categoryList: categoryListReducer,
  offerList:offerListReducer,
  addNewOffer:addNewOfferReducer,
  offerDelete:offerDeleteReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const wishlistFromStorage = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
  cart: {cartItems: cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
  userLogin: { userInfo: userInfoFromStorage },
  wishlist: { wishlist: wishlistFromStorage }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;