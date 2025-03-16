import React, { useState, useEffect } from "react";
import "../styles/OrderDetails.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PopupCancelOrder from "./PopupCancelOrder";
import PopupSummary from "./PopupSummary";
import { BsSearch } from "react-icons/bs";
import { useOrderContext } from "../context/order.context";

function OrdersDetails() {
  const [orders] = useState([]);
  const { ordersData, setOrdersData } = useOrderContext();
  const [searchVal, setSearchVal] = useState("");
  console.log("OrdersData:", ordersData);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/orders`)
      .then((response) => {
        // console.log("API Response:", response.data.data);
        setOrdersData(response.data.data);
      })
      .catch((error) => {
        // console.error("Error fetching orders:", error);
        toast.error("Error fetching orders");
      });
  }, []);

  const goToOrders = () => {
    navigate("/order");
  };

  const handleSearchClick = () => {
    if (searchVal === "") {
      setOrdersData(orders);
      return;
    }
    const filterBySearch = orders.filter((item) => {
      if (
        item.order_id.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.store_location.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.city.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.status.toLowerCase().includes(searchVal.toLowerCase())
      ) {
        return item;
      }
    });
    setOrdersData(filterBySearch);
  };

  return (
    <>
      <div className="container">
        <div className="info-text">
          <p>Orders | {ordersData?.length}</p>
        </div>
        <div className="create-button">
          <button onClick={goToOrders}>Create</button>
        </div>
        <div className="searchbox">
          <div className="search-icon">
            <BsSearch onClick={handleSearchClick} />
          </div>
          <div className="search-text">
            <input
              type="text"
              name="search-text"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="th">
                <p className="p">Order id</p>
              </th>
              <th className="th">
                <p className="p">Order Date & Time</p>
              </th>
              <th className="th">
                <p className="p">Store Location</p>
              </th>
              <th className="th">
                <p className="p">City</p>
              </th>
              <th className="th">
                <p className="p">Store Phone</p>
              </th>
              <th className="th">
                <p className="p">Total Items</p>
              </th>
              <th className="th">
                <p className="p">Price</p>
              </th>
              <th className="th">
                <p className="p">Status</p>
              </th>
              <th className="th">
                <p className="p"></p>
              </th>
              <th className="th">
                <p className="p">View</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.order_id}>
                <td className="table-item">{order.order_id}</td>
                <td className="table-item">
                  {new Date(order.order_date_time).toLocaleString()}
                </td>
                <td className="table-item">{order.store_location}</td>
                <td className="table-item">{order.city}</td>
                <td className="table-item">{order.store_phone}</td>
                <td className="table-item">{order.total_item}</td>
                <td className="table-item" style={{ color: "#5861AE" }}>
                  {order.price}
                </td>
                <td
                  className="table-item"
                  style={order.status === "Cancelled" ? { color: "red" } : {}}
                >
                  {order.status}
                </td>
                <td className="table-item action">
                  {order.status === "Cancelled" ? (
                    <></>
                  ) : (
                    <PopupCancelOrder order={order} styleClass={"cancel-btn"} />
                  )}
                </td>
                <td className="table-item">
                  <PopupSummary order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersDetails;
