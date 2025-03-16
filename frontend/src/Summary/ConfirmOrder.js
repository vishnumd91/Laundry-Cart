import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmOrders.css"; 

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [order, setOrder] = useState(() => {
    return location.state?.order || JSON.parse(localStorage.getItem("order")) || null;
  });

  useEffect(() => {
    if (order) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  if (!order) {
    return <h2>No order found. Please place an order first.</h2>;
  }

  return (
    <div className="confirm-order-container">
      <h2>Order Confirmation</h2>

      <div className="order-summary">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Order Date & Time:</strong> {order.dateTime}</p>
        <p><strong>Store Location:</strong> {order.storeLocation}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Store Phone:</strong> {order.storePhone}</p>
        <p><strong>Total Items:</strong> {order.totalItems}</p>
        <p><strong>Price:</strong> <span className="price">{order.price} Rs</span></p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
    </div>
  );
};

export default ConfirmOrder;
