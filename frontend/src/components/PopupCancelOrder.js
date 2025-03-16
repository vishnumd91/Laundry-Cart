import React from 'react'
import Popup from 'reactjs-popup';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PopupCancelOrder = (props) => {
    
    const navigate = useNavigate();

    const deleteOrder = async (id) => {

        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/orders/delete/${id}`);
        // console.log("Response while deleting order: ", res);
        
        if(res.data.success){
            toast.success(res.data.message);
            navigate(0);
        }else{
            toast.error(res.data.message);
            navigate(0);
        }
    }

  return (
    <div>
    {/* {console.log("Order received in PopupCancelOrder:", props.order)} */}
    <Popup trigger={<button className={props.styleClass}>Cancel Order</button>} modal nested >
        {
            close => (
                <div className="modal-content">
                    <div className="modal-header-cancel-order">
                        <p className="close-text-cancel-order">Alert</p>
                        <button className="close-btn-cancel-order" onClick={()=>close()}>X</button>
                    </div>
                    <div className="modal-body-cancel-order">
                        <img className="warning-icon" src='/images/warning.png' alt='warning'/>
                        
                        <div className="warning-text-cancel-order">
                            <p>Are you sure want to cancel the oreder No: {props.order.order_id}</p>
                            <button 
                                className="proceed-btn-cancel-order" 
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={() =>{ 
                                    // console.log("Delete button clicked in PopupCancelOrder, order ID: ", props.order._id); 
                                    deleteOrder(props.order._id); 
                                    close()}
                                }
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </Popup>
    </div>
  )
}

export default PopupCancelOrder
