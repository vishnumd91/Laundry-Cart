import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Data from "../data/data.json";
import "./SummaryPage.css";
import axios from "axios";
import { useUser } from "../context/user";
import { toast } from "react-hot-toast";

const SummaryPage = ({ closeOverlay }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("currUser"))?.user?._id;

  const { orderDetails = [] } = location.state || {};
  console.log("User:", orderDetails);

  const [summaryData, setSummaryData] = useState([]);

  // const stores = Data.store || [];

  const [selectedStore, setSelectedStore] = useState(
    summaryData?.length > 0 ? summaryData[0] : null
  );

  const getStoreDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/stores`
      );
      setSummaryData(response.data.data);
      setSelectedStore(response.data.data);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    // const savedStore = JSON.parse(localStorage.getItem("selectedStore"));
    // if (savedStore) {
    getStoreDetails();
    // setSelectedStore(summaryData);
    // }
  }, [navigate]);

  console.log("Summary Data:", summaryData);

  const handleStoreChange = (e) => {
    const newStore = summaryData.find(
      (store) => store.storeLocation === e.target.value
    );

    if (newStore) {
      setSelectedStore(newStore);
      // localStorage.setItem("selectedStore", JSON.stringify(newStore));
    }
  };

  console.log("Selected Store:", selectedStore);

  const subtotal = orderDetails.reduce((acc, item) => acc + item.price, 0);
  const pickupCharge = 90;
  const total = subtotal + pickupCharge;

  const goToSuccess = () => {
    // Call POST API to save order details
    const createOrder = async () => {
      try {
        const payload = {
          order_id: "ORD123456",
          user_id: userId,
          product_type: orderDetails[0]?.name,
          quantity: orderDetails[0]?.quantity,
          wash_type: ["washing-machine", "ironing"],
          price: orderDetails[0]?.unitPrice,
          order_date_time: "2023-10-01T10:00:00Z",
          store_location: selectedStore?.storeLocation,
          city: selectedStore?.storeCity ?? "Andheri",
          store_phone: 1234567890,
          total_items: orderDetails[0]?.quantity,
          status: "Ready to Pickup",
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/orders/add`,
          payload
        );
        if (response.data.status === "success") {
          console.log("Order created successfully:", response.data.data);
          toast.success("Order created successfully");
        }
        // Handle the response if needed
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Error creating order");
      }
    };

    // Call the createOrder function when the Confirm button is clicked
    createOrder();
    // Reset the cart
    // Navigate to success page
    navigate("/successful");
  };

  // };

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Summary</h2>
        <button className="close-btn" onClick={closeOverlay}>
          X
        </button>
      </div>

      <div className="store-info">
        <select
          onChange={handleStoreChange}
          value={selectedStore?.storeLocation || ""}
        >
          {summaryData.map((store) => (
            <option key={store.storeLocation} value={store.storeLocation}>
              {store.storeLocation}
            </option>
          ))}
        </select>

        {selectedStore && (
          <div className="store-details">
            <p>
              <strong>Store Address:</strong> {selectedStore.storeAddress}{" "}
              <strong>Phone:</strong>{" "}
              {selectedStore.storePhone
                ? selectedStore.storePhone
                : "Not Available"}
            </p>
            {/* <p><strong>Phone:</strong> {selectedStore.storePhone ? selectedStore.storePhone : "Not Available"}</p> */}
          </div>
        )}
      </div>

      <div className="order-details">
        <h5>Order Details</h5>
        {orderDetails.length > 0 ? (
          orderDetails.map((item, index) => (
            <div key={index} className="order-item">
              <span>{item.name}</span>
              <em>{item.services.join(", ")}</em>
              <span>{`${item.quantity} X ${item.unitPrice} = `}</span>
              <span className="price">Rs {item.price}</span>
            </div>
          ))
        ) : (
          <p>No items selected.</p>
        )}
      </div>

      <div className="price-summary">
        <p>
          Sub total: <strong>Rs {subtotal}</strong>
        </p>
        <p>
          Pickup Charges: <strong>Rs {pickupCharge}</strong>
        </p>
        <p className="total">
          Total: <strong>Rs {total}</strong>
        </p>
      </div>

      <button className="confirm-btn" onClick={goToSuccess}>
        Confirm
      </button>
    </div>
  );
};

export default SummaryPage;
