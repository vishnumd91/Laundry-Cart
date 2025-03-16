// import { useState } from "react";
// import { Home, List, Plus, Anvil, WashingMachine } from "lucide-react";
// import Styles from "./styles/List.module.css";

// export default function Lists() {
//   const [orders, setOrders] = useState([
//     { id: 1, name: "Shirts", quantity: 0, price: 20, selectedWash: [] },
//     { id: 2, name: "T Shirts", quantity: 0, price: 15, selectedWash: [] },
//     { id: 3, name: "Trousers", quantity: 0, price: 30, selectedWash: [] },
//     { id: 4, name: "Jeans", quantity: 0, price: 30, selectedWash: [] },
//     { id: 5, name: "Boxers", quantity: 0, price: 10, selectedWash: [] },
//     { id: 6, name: "Joggers", quantity: 0, price: 25, selectedWash: [] },
//     { id: 7, name: "Others", quantity: 0, price: 40, selectedWash: [] },
//   ]);

//   const handleQuantityChange = (id, value) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === id ? { ...order, quantity: value } : order
//       )
//     );
//   };

//   const toggleWashType = (id, washType) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === id
//           ? {
//               ...order,
//               selectedWash: order.selectedWash.includes(washType)
//                 ? order.selectedWash.filter((w) => w !== washType)
//                 : [...order.selectedWash, washType],
//             }
//           : order
//       )
//     );
//   };

//   return (
//     <div className={Styles.container}>
//       {/* Sidebar */}
//       <aside className={Styles.sidebar}>
//         <div className={Styles.sidebarIcons}>
//           <Home size={24} className={Styles.icon} />
//           <Plus size={24} className={Styles.icon} />
//           <List size={24} className={Styles.icon} />
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className={Styles.mainContent}>
//         {/* Navbar */}
//         <nav className={Styles.navbar}>
//           <h1 className={Styles.logo}>LAUNDRY</h1>
//           <div className={Styles.navLinks}>
//             <span>Pricing</span>
//             <span>Career</span>
//             <div className={Styles.profile}>
//               <img
//                 src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg"
//                 alt="User Profile"
//                 className={Styles.profileImg}
//               />
//               <span>User Name</span>
//             </div>
//           </div>
//         </nav>

//         {/* Orders Section */}
//         <div className={Styles.ordersSection}>
//           <h2 className={Styles.orderTitle}>Create Order</h2>
//           <table className={Styles.orderTable}>
//             <thead>
//               <tr>
//                 <th>Product Types</th>
//                 <th>Quantity</th>
//                 <th>Wash Type</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td className={Styles.productCell}>
//                     <img
//                        src={`https://via.placeholder.com/50`}
//                       alt={order.name}
//                       className={Styles.productImage}
//                     />
                  
//                     <div>
//                       <span>{order.name}</span>
//                       <p className={Styles.productDescription}>Lorem ipsum is simply dummy text</p>
//                     </div>
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={order.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(order.id, parseInt(e.target.value) || 0)
//                       }
//                       className={Styles.inputField}
//                     />
//                   </td>
//                   <td className={Styles.washTypeButtons}>
//                     <button
//                       className={order.selectedWash.includes("wash") ? Styles.selected : ""}
//                       onClick={() => toggleWashType(order.id, "wash")}
//                     >
//                       {/* <img src="/icons/wash.png" alt="wash" className={Styles.iconButton} /> */}
//                       <WashingMachine className={Styles.iconButton} />
                      
//                     </button>
//                     <button
//                       className={order.selectedWash.includes("iron") ? Styles.selected : ""}
//                       onClick={() => toggleWashType(order.id, "iron")}
//                     >
//                       {/* <img src="/icons/iron.png" alt="iron" className={Styles.iconButton} /> */}
//                       <Anvil className={Styles.iconButton} />
//                     </button>
//                   </td>
//                   <td>
//                     {order.quantity > 0 && order.selectedWash.length > 0
//                       ? `${order.quantity} x ${order.price} = ${order.quantity * order.price}`
//                       : "—"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className={Styles.orderActions}>
//             <button className={Styles.cancelButton}>Cancel</button>
//             <button className={Styles.proceedButton}>Proceed</button>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className={Styles.footer}>2021 © Laundry</footer>
//       </div>
//     </div>
//   );
// }
