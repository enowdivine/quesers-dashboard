import React from "react";
import Layout from "../../layouts/Layout";

const CashoutRequest = () => {
  return (
    <Layout>
      <div className="CRTable">
        <table>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ].map((item, index) => (
            <tr key={index}>
              <td>Peter mike tunde</td>
              <td>672491296</td>
              <td>test@gmail.com</td>
              <td>4000</td>
              <td>pending</td>
              <td>20-01-2024</td>
            </tr>
          ))}
        </table>
      </div>
    </Layout>
  );
};

export default CashoutRequest;
