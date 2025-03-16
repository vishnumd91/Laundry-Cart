import React from 'react';
import Layout from '../components/layout/Layout';
import Main from '../components/Main';

function PastOrders() {
  return (
    <Layout title={"Past Orders - Laundry Cart"}>
      <div style={{height: "100vh"}}>
        <Main/>
      </div>
    </Layout>
  )
}

export default PastOrders
