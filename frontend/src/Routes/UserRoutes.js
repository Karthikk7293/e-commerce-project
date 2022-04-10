import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header';
import CategoryScreen from '../Pages/CategoryScreen';
import HomeScreen from '../Pages/HomeScreen';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import ProductScreen from '../Pages/ProductScreen';
import CartScreen from '../Pages/CartScreen';
import WishListScreen from '../Pages/WishListScreen';
import ProfileScreen from '../Pages/ProfileScreen';
import ShippingScreen from '../Pages/ShippingScreen';
import PaymentScreen from '../Pages/PaymentScreen';
import PlaceOrderScreen from '../Pages/PlaceOrderScreen';
import OrderScreen from '../Pages/OrderScreen';
import UserListScreen from '../Pages/UserListScreen';
import ProductListScreen from '../Pages/ProductListScreen';
import ProductEditScreen from '../Pages/ProductEditScreen';
import OrderListScreen from '../Pages/OrderListScreen'
import EditAddress from '../Pages/EditAddress'
import CategoryList from '../Pages/CategoryList';
import AddCategory from '../Pages/AddCategory';
import CreateOffer from '../Pages/CreateOffer';
import DashBoard from '../Pages/DashBoard';
import Footer from '../components/Footer';
import SalesReport from '../Pages/SalesReport';
import ErrorPage from '../components/Error'
import OtpScreen from '../Pages/OtpScreen';
import OtpVarifyScreen from '../Pages/OtpVarifyScreen';
const UserRoutes = () => {
    return (
        <>
            <Header/>
            <main style={{minHeight: '85vh'}}>
            <Routes>
                <Route path='*' element={<ErrorPage/>} />
                <Route path='/order/:id' element={<OrderScreen/>} />
                <Route path='/' element={<HomeScreen />} />
                <Route path='/signin'  element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/otp' element={<OtpScreen />} />
                <Route path='/otp/varify/:number' element={<OtpVarifyScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/shipping' element={<ShippingScreen/>}/>
                <Route path='/product/:id' element={<ProductScreen/>}/>
                <Route path='/categories' element={<CategoryScreen/>}/>
                <Route path='/cart' element={<CartScreen/>}/>
                <Route path='/wishlist' element={<WishListScreen/>}/>
                <Route path='/cart/:id' element={<CartScreen/>}/>

                <Route path='/admin/userlist' element={<UserListScreen/>}/>
                <Route path='/admin/productlist' element={<ProductListScreen/>}/>
                <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
                <Route path='/admin/product/:id/edit/:add' element={<ProductEditScreen/>}/>
                <Route path='/admin/orderlist' element={<OrderListScreen/>}/>

                <Route path='/payment' element={<PaymentScreen/>}/>
                <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
            
                <Route path='/admin/editaddress/:id' element={<EditAddress/>}/>
                <Route path='/admin/categories' element={<CategoryList/>}/>
                <Route path='/admin/addcategory' element={<AddCategory/>}/>
                <Route path='/admin/offers' element={<CreateOffer/>}/>
                <Route path='/admin/dashboard' element={<DashBoard/>}/>
                <Route path="/search/:keyword" element={<HomeScreen />}exact/>
                <Route path='/admin/salesreport' element={<SalesReport/>}/>
            </Routes>
            </main>
            <Footer/>
        </>
    )
};

export default UserRoutes;
