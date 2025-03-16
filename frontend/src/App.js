import {Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Orders from './pages/Orders';
import PageNotFound from './pages/PageNotFound';
import PastOrders from './pages/PastOrders';
import SignUp from './pages/SignUp';
import Pricing from './pages/Pricing';
import Career from './pages/Career';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';

import React from "react";
import LaundryDashboard from './components/laundryDash';
import OrderTable from "./components/OrderTable";
import SummaryPage from "./Summary/SummaryPage.js";
import Successful from "./Summary/Successful.js";
import OrderPage from "./Summary/OrderPage";
import ConfirmOrder from "./Summary/ConfirmOrder";
import "./App.css"; 


function App() {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Routes>

        <Route path='/' element = {<ProtectedRoute/>}>
          <Route path='' element = {<Home/>}/>
        </Route>

        <Route path='/orders' element = {<ProtectedRoute/>}>
          <Route path='' element = {<LaundryDashboard />}/>
        </Route>

        <Route path='/order' element = {<ProtectedRoute/>}>
            <Route path=""  element={<OrderTable/>}></Route>  
        </Route>

        <Route path='/past-orders' element = {<ProtectedRoute/>}>
          <Route path='' element = {<PastOrders/>}/>
        </Route>

        <Route path='/user-profile' element = {<ProtectedRoute/>}>
          <Route path='' element = {<UserProfile/>} />
        </Route>
        
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/pricing' element = {<Pricing />} />
        <Route path='/career' element = {<Career/>} />
        <Route path='/blogs' element = {<Blogs/>}/>
        <Route path='/forgotpassword' element = {<ForgotPassword/>}/>
        <Route path='*' element = {<PageNotFound/>}/>

        
        <Route path="/summaryPage" element={<SummaryPage/>}></Route>
        <Route path="/successful" element={<Successful/>}></Route>
        {/* <Route path="/orderTable" element={<OrderTable/>}></Route> */}
        {/* <Route path="/" element={<Home/>}></Route> */}
        <Route path="/orderPage" element={<OrderPage />}/>
        <Route path="/confirmOrder" element={<ConfirmOrder />}/>
        {/* <Route path="/orderPlaced" element={<ConfirmOrderPage/>}></Route> */}
        

      </Routes>
      </div>
    </>
  );
}

export default App;
