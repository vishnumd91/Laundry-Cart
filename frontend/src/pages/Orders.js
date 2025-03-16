import React from 'react'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/Sidebar'
import { BsSearch } from 'react-icons/bs';

function Orders() {
  return (
    
        <Layout title={"Orders - Laundry Cart"}>
          <Sidebar/>
          <div className="container">
              <div className="info-text">
                  <p>Orders | 0</p>
              </div>
              <div className="create-button">
                  <button>Create</button>
              </div>
              <div className="searchbox">
                  <div className="search-icon">
                  <BsSearch/>
                  </div>
                  <div className="search-text">
                      <input type="text" name="search-text" />           
                  </div>
              </div>
          </div>
          <div style={{height:"91.2vh"}}></div>
        </Layout>
    
  )
}

export default Orders
