import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useUser } from '../context/user';
import PopupCancelOrder from "./PopupCancelOrder";

const PopupSummary = (props) => {
  const [user, setUser] = useUser();
  return (
    
    <Popup 
        debug={true}
        trigger={<button className="view-btn">
          <img className="view-icon" src='/images/view.png' alt='view'/>
        </button>
        } 
        position={"left center"}
        popupClassName="summary-popup" 
    >
        {
        close => (
        <div className='summary-container-popup-summary'>
            <div className='summary-header-popup-summary'>
                <p className='summary-text-popup-summary'>Summary</p>
                <button className="close-btn-popup-summary" onClick={()=>close()}>X</button>
            </div>
            <div className='summary-body-popup-summary'>
                <div className='store-details-popup-summary'>
                    <div className='store-location-popup-summary store-item-popup-summary'>
                        <p className='store-item-header-popup-summary'>Store Location</p>
                        <p className='store-item-text-popup-summary'>{props.order.store_location}</p>
                    </div>
                    <div className='store-address-popup-summary store-item-popup-summary'>
                        <p className='store-item-header-popup-summary'>Store Address:</p>
                        <p className='store-item-text-popup-summary'>Near Phone booth, 10th road,</p>
                    </div>
                    <div className='store-phone-popup-summary store-item-popup-summary'>
                        <p className='store-item-header-popup-summary'>Phone</p>
                        <p className='store-item-text-popup-summary'>{props.order.store_phone}</p>                 
                    </div>  
                </div>
                <div className='order-status-popup-summary'>
                  {
                    props.order.status === "Ready to Pickup" ? (
                      <>
                        <input type='radio' name='Picked up' checked="checked" onChange={() => {return false}}/>Picked up
                        <input type='radio' name='Washed' disabled/>Washed
                        <input type='radio' name='Ironed' disabled/>Ironed
                        <input type='radio' name='Delivered' disabled/>Delivered
                      </>
                    ) : (
                      <>
                        {
                          props.order.status === "In Washing" ? (
                            <>
                              <input type='radio' name='Picked up' checked="checked" onChange={() => {return false}}/>Picked up
                              <input type='radio' name='Washed' checked="checked" onChange={() => {return false}}/>Washed
                              <input type='radio' name='Ironed' disabled/>Ironed
                              <input type='radio' name='Delivered' disabled/>Delivered
                            </>
                          ) : (
                            <>
                              {
                                props.order.status === "In Ironing" ? (
                                  <>
                                    <input type='radio' name='Picked up' checked="checked" onChange={() => {return false}}/>Picked up
                                    <input type='radio' name='Washed' checked="checked" onChange={() => {return false}}/>Washed
                                    <input type='radio' name='Ironed' checked="checked" onChange={() => {return false}}/>Ironed
                                    <input type='radio' name='Delivered' disabled/>Delivered
                                  </>
                                ) : (
                                  <>
                                    {
                                      props.order.status === "Ready to deliver" ? (
                                        <>
                                          <input type='radio' name='Picked up' checked="checked" onChange={() => {return false}}/>Picked up
                                          <input type='radio' name='Washed' checked="checked" onChange={() => {return false}}/>Washed
                                          <input type='radio' name='Ironed' checked="checked" onChange={() => {return false}}/>Ironed
                                          <input type='radio' name='Delivered' checked="checked" onChange={() => {return false}}/>Delivered
                                        </>
                                      ) : (
                                        <>
                                            <input type='radio' name='Picked up' disabled/>Picked up
                                            <input type='radio' name='Washed' disabled/>Washed
                                            <input type='radio' name='Ironed' disabled/>Ironed
                                            <input type='radio' name='Delivered' disabled/>Delivered
                                        </>
                                      )
                                    }
                                  </>
                                )
                              }
                            </>
                          )
                        }
                      </>
                    )
                  }
                </div>
                <div className='order-details-popup-summary' style={{marginLeft: "2vw"}}>
                  <p>Order Details</p>
                  <table className='table-popup-summary'>
                    <tbody>
                        <tr>
                              <td className='table-item-popup-summary'>{props.order.product_type}</td>
                              <td className='table-item-popup-summary'>{props.order.wash_type}</td>
                              <td className='table-item-popup-summary'>{props.order.price}</td>
                          </tr>
                          <tr>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'>Sub total: {props.order.price}</td>
                          </tr>
                          <tr>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'>Pickup Charges: {90}</td>
                          </tr>
                          <tr className='custom-row'>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'></td>
                              <td className='table-item-popup-summary'>Total: {props.order.price + 90}</td>
                          </tr>
                    </tbody>
                  </table>
                </div>
                <div className='address-popup-summary'>
                  <p>Address</p>
                  <div className='address-box-popup-summary'>
                    <p>Home</p>
                    <p>{user.currUser.address}</p>
                  </div>
                </div>
                <div className='cancel-action-popup-summary'>
                  {/* {console.log("Order in parent component:", props.order)} */}
                  <PopupCancelOrder order = {props.order} styleClass = {"cancel-btn-summary"} />
                </div>
            </div>
        </div>
        )
        }
    </Popup>
  )
}

export default PopupSummary
