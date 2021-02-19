import React, { useState, useEffect, useContext } from "react";

import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";
import { editProduct } from "../../../store/actions/product";
import { addSale } from "../../../store/actions/sale";
import { setSelectedSale } from "../../../store/actions/sale";
import { DateRangePicker } from 'react-date-range'
import GlobalContext from "../../../context/GlobalContext";
import { MDBDataTable } from "mdbreact";
import { addDays } from 'date-fns';



const Sourcing = ({

  isAuthenticated,
  selectedCustomer,
  allLogs,
  sales,
  setSelectedSale

}) => {

  const gContext = useContext(GlobalContext);
  console.log(sales)
  let [pendingPayment, setPendingPayment] = useState(0)
  let [filteredSale, setFilteredSale] = useState([])

  useEffect(() => {
    pendingPayment = 0;
    if (sales && selectedCustomer) {
      sales.map((item) => {
        if (item.customer._id == selectedCustomer._id) {
          pendingPayment = pendingPayment + item.pending_payment
        }
      })
      setPendingPayment(pendingPayment)
    }
  }, [sales, selectedCustomer])
  console.log(pendingPayment)

  useEffect(() => {
    if (allLogs && selectedCustomer) {
      filteredSale = allLogs.filter((item) => {
        return item.CUSTOMER._id == selectedCustomer._id
      })
    }
    setFilteredSale(filteredSale)
  }, [selectedCustomer, allLogs])

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  let tabValues = {
    customer_name: "",
    order_number: "",
    total_products: "",
    total_payment: "",
    pending_payment: "",
    date_created: "",
  };


  let headings = [
    "Customer Name",
    "Order No.",
    "Total Products",
    "Total Payment",
    "Pending Payment",
    "Created At",
  ];
  let allColumns = [];
  Object.keys(tabValues).map((key, index) => {
    let data = {
      label: headings[index],
      field: key,
      width: 200,
    };
    allColumns.push(data);
  });
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Actions",
        field: "badge",
        width: 150,
      },
      ...allColumns,
    ],
    rows: [],
  });



  let saleData = []


  useEffect(() => {
    if (sales) {
      sales.map((item) => {
        if (selectedCustomer._id == item.customer._id) {
          let data = {
            _id: item._id,
            customer_name: item.customer.customer_name + " ( " + item.customer.contact + " )",
            order_number: new Date(item.date_created).getTime(),  
            total_products: item.products.length,
            total_payment: item.total_price,
            pending_payment: item.pending_payment,
            date_created: new Date(item.date_created).toLocaleDateString(),
            customer_data: item.customer,
            products_data: item.products,
          }
          console.log(data)
          let startDate = new Date(new Date(state[0].startDate).toDateString())
          let endDate = new Date(new Date(state[0].endDate).toDateString())
          let saleDate = new Date(new Date(item.date_created).toDateString())
          console.log(endDate + "End")
          console.log(startDate + "start")
          console.log(saleDate + "sale")
          if (startDate <= saleDate && endDate >= saleDate) {
            console.log("working")
            saleData.push(data)
          }
        }

      })
    }
  }, [state, sales])
  console.log(saleData)

  console.log(sales)
  useEffect(() => {
    if (saleData) {
      setDatatable({
        ...datatable,
        rows: [
          ...saleData.map((row, order) => ({
            ...row,
            badge: (
              <>
                <i
                  style={{ cursor: "pointer" }}
                  class="fas fa-money-check"
                  onClick={() => handlePayment(row)}
                ></i>
                &nbsp; &nbsp;
                <i
                  style={{ cursor: "pointer" }}
                  class="fa fa-eye"
                  onClick={() => handleViewDetail(row)}
                ></i>
                &nbsp; &nbsp;
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteReport(row)}
                  class="fas fa-trash-alt"
                ></i>
              </>
            ),
          })),
        ],
      });
    }
  }, [sales, state]);
  console.log(datatable)





  const handleDeleteReport = async (row) => {
    console.log(row);
    setSelectedSale(row);
    gContext.toggleDeleteModal("SALES");

  };
  const handlePayment = async (row) => {
    console.log(row);
    setSelectedSale(row);
    gContext.togglePaymentModal();

  };

  const handleViewDetail = (row) => {
    console.log(row);
    setSelectedSale(row);
    Router.push("/reports/sale/detail");
  };



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
              Customer Detail
             </h5>


            {/* <!-- Start Feature One --> */}
            <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">

              <a className="font-size-3 d-block mb-0 text-gray">
                No. {selectedCustomer && selectedCustomer.contact}
              </a>

              <h2 className="mt-n4">

                <a className="font-size-7 text-black-2 font-weight-bold mb-4">
                  {selectedCustomer && selectedCustomer.customer_name}
                </a>

              </h2>
              <ul className="list-unstyled mb-1 card-tag-list">
                <li>

                  <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                    <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                    {selectedCustomer && selectedCustomer.address}
                  </a>

                </li>
                <li>

                  <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                    <i className="fa fa-money-bill mr-2 font-weight-bold"></i>{" "}
                       Pending Payment : {pendingPayment}
                  </a>

                </li>

              </ul>

            </div>
            {/* <!-- End Feature One --> */}


            <div className='row'>
              <div className='col-lg-12'>
                <h5 style={{ color: "#00b074" }}>Sales</h5>
                {/* <div style={styles.csv/Button}> */}
                <div>
                  <DateRangePicker
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                  />;
            <input
                    type="button"
                    value="Add Sale"
                    onClick={() => Router.push('/forms/sale')}
                    className="btn btn-green btn-h-10 text-white min-width-px-100 float-right mt-6 rounded-5 text-uppercase"
                  />
                </div>

                <MDBDataTable
                  hover
                  entriesOptions={[10, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable}
                  pagingTop
                  searchTop
                  scrollX
                  scrollY
                  maxHeight="70vh"
                  searchBottom={false}
                />
              </div>

            </div>



            <div className='row'>


              <div>

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
                        Order No.
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
                          <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.CUSTOMER && item.ORDER_NUMBER}</td>
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
  sales: state.sale.sales,
  selectedCustomer: state.customer.selectedCustomer,
  allLogs: state.logs.transactionLogs

});
export default connect(mapStateToProps, { editProduct, addSale, setSelectedSale })(Sourcing);
