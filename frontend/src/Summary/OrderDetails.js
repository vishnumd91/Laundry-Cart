// import React, { useState } from "react";
// import SummaryPage from "./SummaryPage"; 
// import { useNavigate } from "react-router-dom";

// const laundryItems = [
//   { id: 1, name: "Shirts", price: 20 },
//   { id: 2, name: "Jeans", price: 30 },
//   { id: 3, name: "Joggers", price: 100 },
//   { id: 4, name: "Trousers", price: 50 },
//   { id: 5, name: "T-Shirts", price: 25 }
// ];

// const OrderPage = () => {
//   const [selectedItems, setSelectedItems] = useState([]); 
//   // const [showSummary, setShowSummary] = useState(false); 

//   const handleSelect = (item, quantity) => {
//     if (quantity > 0) {
    
//       setSelectedItems((prev) => {
//         const existingItem = prev.find((i) => i.id === item.id);
//         if (existingItem) {
//           return prev.map((i) => (i.id === item.id ? { ...i, quantity } : i));
//         } else {
//           return [...prev, { ...item, quantity }];
//         }
//       });
//     } else {
  
//       setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
//     }
//   };
   
//   const navigate = useNavigate();
//   const goToSuccess = ()=>{
//     navigate('/successful')
//   }

//   return (
//     <div>
//           <h2>Create Order</h2>
//       <div>
//         {laundryItems.map((item) => (
//           <div key={item.id}>
//             <span>{item.name} - ₹{item.price}</span>
//             <input
//               type="number"
//               min="0"
//               onChange={(e) => handleSelect(item, parseInt(e.target.value))}
//               placeholder="Quantity"
//             />
//           </div>
//         ))}
//       </div>

//       <button onClick={goToSuccess}>Confirm</button>

//       {/* {showSummary && <SummaryPage selectedItems={selectedItems} onClose={() => setShowSummary(false)} />} */}
//     </div>
//   )
// };

// export default OrderPage;     
// // () => setShowSummary(true)



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryPage from "../Summary/SummaryPage"; 

const initialItems = [
  { id: 1, name: "Shirts", pricePerUnit: 20, image: "https://m.media-amazon.com/images/I/71I-cik1CyL._AC_UL1500_.jpg" },
  { id: 2, name: "T-Shirts", pricePerUnit: 15, image: "https://cdnp.sanmar.com/medias/sys_master/images/images/h01/h5d/8806071894046/4085-Black-5-2000LBlackFlatFront-1200W.jpg" },
  { id: 3, name: "Trousers", pricePerUnit: 25, image: "https://www.pngmart.com/files/6/Trousers-PNG-Free-Download.png" },
  { id: 4, name: "Jeans", pricePerUnit: 30, image: "https://www.fullbeauty.com/on/demandware.static/-/Sites-masterCatalog_Roamans/default/dw69d4ca3a/images/hi-res/0549_08475_mc_5350.jpg" },
  { id: 5, name: "Boxers", pricePerUnit: 10, image: "https://tse3.mm.bing.net/th?id=OIP.FcKfFh47LsIlf4UM2E-Q7QHaHa&pid=Api&P=0&h=180" },
  { id: 6, name: "Joggers", pricePerUnit: 40, image: "https://thumbs.dreamstime.com/z/runner-running-jogger-jogger-young-man-isolated-white-background-one-caucasian-runner-running-jogger-jogger-young-man-studio-169254870.jpg" },
];

const washTypes = [
  { id: "wash", label: "🧼", multiplier: 1 },
  { id: "iron", label: "🪮", multiplier: 1.2 },
  { id: "fold", label: "🛒", multiplier: 1.5 },
  { id: "pack", label: "🛍️", multiplier: 2 },
];

const OrderTable = () => {
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, quantity: 0, selectedWashes: [] }))
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, value) } : item
      )
    );
  };

  const handleWashSelection = (id, washId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selectedWashes: item.selectedWashes.includes(washId)
                ? item.selectedWashes.filter((w) => w !== washId)
                : [...item.selectedWashes, washId],
            }
          : item
      )
    );
  };

  const calculatePrice = (item) => {
    if (item.quantity === 0 || item.selectedWashes.length === 0) return "--";
    const basePrice = item.quantity * item.pricePerUnit;
    const multiplier = item.selectedWashes.reduce(
      (total, washId) =>
        total * (washTypes.find((w) => w.id === washId)?.multiplier || 1),
      1
    );
    return Math.round(basePrice * multiplier);
  };

  const goToSummary = () => {
    const selectedItems = items
      .filter((item) => item.quantity > 0 && item.selectedWashes.length > 0)
      .map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.pricePerUnit,
        price: calculatePrice(item),
        services: item.selectedWashes.map(
          (id) => washTypes.find((wash) => wash.id === id)?.label
        ),
      }));
  
    navigate("/summaryPage", { state: { orderDetails: selectedItems } });
  };
  

  return (
    <div className="order-container">
      <h2>Create Order</h2>
      <table>
        <thead>
          <tr>
            <th>Product Types</th>
            <th>Quantity</th>
            <th>Wash Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} className="item-img" />
                <span>{item.name}</span>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                  }
                />
              </td>
              <td>
                {washTypes.map((wash) => (
                  <button
                    key={wash.id}
                    className={`wash-btn ${
                      item.selectedWashes.includes(wash.id) ? "selected" : ""
                    }`}
                    onClick={() => handleWashSelection(item.id, wash.id)}
                  >
                    {wash.label}
                  </button>
                ))}
              </td>
              <td className="price">{calculatePrice(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button className="cancel">Cancel</button>
        <button className="proceed" onClick={() => setShowOverlay(true)}>
          Proceed
        </button>

        {showOverlay && (
          <div className="overlay">
            <SummaryPage closeOverlay={() => setShowOverlay(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
