import { useState } from "react";
//import { Home, List, Plus, Sidebar } from "lucide-react";

// import styles from "./styles/Dashboard.module.css";
import styles from "../styles/Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Sidebar from "./Sidebar";
import { BsSearch } from "react-icons/bs";
import OrdersDetails from "./OrdersDetails";
import { useOrderContext } from "../context/order.context";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function LaundryDashboard() {
  const [orders] = useState([]);
  const { ordersData, setOrdersData } = useOrderContext();
  console.log("OrdersData main:", ordersData);

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

  const goToOrder = () => {
    navigate("/order");
  };

  return (
    <>
      <Layout>
        <Sidebar />
        <div className="container">
          {/* <div className="info-text">
            <p>Orders | {ordersData.length}</p>
          </div> */}
          {/* <div className="searchbox">
            <div className="search-icon">
              <BsSearch />
            </div>
            <div className="search-text">
              <input type="text" name="search-text" />
            </div>
          </div> */}
        </div>
        <div className={styles.container} style={{ height: "100vh" }}>
          <div className={styles.mainContent}>
            <div className={styles.ordersSection}>
              {ordersData.length === 0 ? (
                <div className={styles.noOrders}>
                  <p>No Orders available</p>
                  <button className={styles.createButton} onClick={goToOrder}>
                    Create
                  </button>
                </div>
              ) : (
                <OrdersDetails />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
