import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const OrderContext = createContext([]);

export const OrderContextProvider = ({ children }) => {
  const [ordersData, setOrdersData] = useState([]);

  const contextValue = {
    ordersData,
    setOrdersData,
  };
  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
