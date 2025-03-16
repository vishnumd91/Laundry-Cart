import React from "react";
import OrdersDetails from "./OrdersDetails";
import Sidebar from './Sidebar';

function Main(){
    return(
        <>
            <div style={{minHeight: "75vh"}}>
                <Sidebar/>
                <OrdersDetails/>
            </div>
        </>
    );
}

export default Main;