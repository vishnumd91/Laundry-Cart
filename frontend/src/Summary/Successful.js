import React from "react";
import "./orderSuccess.css"; 
import { useNavigate } from "react-router-dom";

const OrderSuccessModal = () => {
  const navigate = useNavigate();
  
  const goToOrderPlaced = ()=>{
    navigate('/successful')
  }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <span className="checkmark">✔</span>
        
        <h2>Your order is successfully.</h2>
        <p>You can track the delivery in the "Orders" section.</p>
        <button className="order-button" onClick={ goToOrderPlaced }>Go to orders</button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
