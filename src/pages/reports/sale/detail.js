import React, { useState, useEffect } from "react";

import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";
import { editProduct } from "../../../store/actions/product";
import { addSale } from "../../../store/actions/sale";

import Select from 'react-select';



import Link from 'next/link'
import { constant } from "lodash";

const Sourcing = ({

  isAuthenticated,
  selectedSale,
  allLogs

}) => {
  console.log(selectedSale)


  const [saleData, setSaleData] = useState()
  let [filteredSale, setFilteredSale] = useState([])
  useEffect(() => {
    if (selectedSale) {
      setSaleData(selectedSale)
    }
  }, [selectedSale])


  useEffect(() => {
    if (allLogs && selectedSale) {
      filteredSale = allLogs.filter((item) => {
        return item.SALE_id == selectedSale._id
      })
    }

    setFilteredSale(filteredSale)
  }, [selectedSale, allLogs])


  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div
          className="dashboard-main-container mt-lg-20"
          id="dashboard-body"
        >
          <div className="container">
            <h5 className="font-size-6 font-weight-semibold mb-11">
              Sale Detail
                                    </h5>


            {/* <!-- Start Feature One --> */}
            <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">

              <a className="font-size-3 d-block mb-0 text-gray">
                No. {saleData && saleData.customer_data && saleData.customer_data.contact}
              </a>

              <h2 className="mt-n4">

                <a className="font-size-7 text-black-2 font-weight-bold mb-4">
                  {saleData && saleData.customer_data && saleData.customer_data.customer_name}
                </a>

              </h2>
              <ul className="list-unstyled mb-1 card-tag-list">
                <li>

                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                    <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                    {saleData && saleData.customer_data && saleData.customer_data.address}
                  </a>

                </li>
                <li>

                  <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                    <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                  Customer
                                </a>

                </li>

              </ul>
              <ul className="list-unstyled mb-1 card-tag-list">
                <li>

                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                    Total Payment &nbsp; <i className="fas fa-money-bill-alt mr-2 font-weight-bold"></i>{" "}
                    {saleData && saleData.total_payment}
                  </a>

                </li>
                <li>

                  <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                    Pending Payment &nbsp; <i className="fas fa-money-bill-alt mr-2 font-weight-bold"></i>{" "}

                    {saleData && saleData.pending_payment}
                  </a>

                </li>

              </ul>


            </div>
            {/* <!-- End Feature One --> */}


            <div className='row'>


              <div>

              </div>
            </div>
            <div className="row">
              <label
                htmlFor="aboutTextarea"
                className="d-block text-black-2 font-size-4 font-weight-semibold ml-7 mb-4"
              >
                Products
                                                          </label>

              <div className="table-responsive ml-10">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pl-0  border-0 font-size-4 font-weight-bold"
                      >
                        Product Name
                        </th>

                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-bold"
                      >
                        Quantity
                 </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-bold"
                      >
                        Total Price
                 </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      saleData && saleData.products_data && saleData.products_data.map((item) => (

                        <tr className="border border-color-2">
                          <td className="table-y-middle py-7 min-width-px-100">
                            {item.product_name}
                          </td>
                          <td className="table-y-middle py-7 min-width-px-100">
                            {item.selected_quantity}
                          </td>
                          <td className="table-y-middle py-7 min-width-px-100">
                            {item.total_price}
                          </td>

                        </tr>
                      ))
                    }


                  </tbody>
                </table>
              </div>
            </div>

            <div className='row'>
              <label
                htmlFor="aboutTextarea"
                className="d-block text-black-2 font-size-4 font-weight-semibold ml-7 mb-4"
              >
                Payments
                 </label>
              <div className="table-responsive ml-10">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pl-0  border-0 font-size-4 font-weight-bold"
                      >
                        Customer Name
                        </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-bold"
                      >
                        Contact
                  </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-bold"
                      >
                        Payment
                   </th>
                      <th
                        scope="col"
                        className="border-0 font-size-4 font-weight-bold"
                      >
                        Timestamp
                   </th>

                    </tr>
                  </thead>

                  <tbody>
                    {
                      filteredSale && filteredSale.map((item) => (
                        <tr className="border border-color-2">
                          <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.CUSTOMER && item.CUSTOMER.customer_name}</td>
                          <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.CUSTOMER && item.CUSTOMER.contact}</td>
                          <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.PAYMENT} rs.</td>
                          <td scope="row" className="pl-6 border-0 py-7 pr-0">{new Date(item.TIMESTAMP).toLocaleString()}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
              </div>
            </div>




          </div>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  customers: state.customer.customers,
  selectedSale: state.sale.selectedSale,
  products: state.product.products,
  allLogs: state.logs.transactionLogs

});
export default connect(mapStateToProps, { editProduct, addSale })(Sourcing);
