import React, { useState, useEffect, useContext } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Router from "next/router";
import { getProducts, deleteProduct, editProduct } from "../../../store/actions/product";
import { setSelectedSale } from "../../../store/actions/sale";
import { DateRangePicker } from 'react-date-range'
import GlobalContext from "../../../context/GlobalContext";
import { addDays } from 'date-fns';
import ReactToPrint from 'react-to-print';




const finance = ({
  isAuthenticated,
  getProducts,
  sales,
  setSelectedSale,
  allLogs,
  user
}) => {
  const styles = {
    csvButton: {
      width: "fit-content",
      border: "4px solid",
      padding: "4px",
      float: "right",
      borderRadius: "7px",
      marginTop: "1.1rem",
      fontSize: "13px",
    },
  };
  const gContext = useContext(GlobalContext);
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
    getProducts();
  }, [isAuthenticated]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [state2, setState2] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  let tabValues = {
    customer_name: "",
    description:"",
    order_number: "",
    total_products: "",
    total_payment: "",
    pending_payment: "",
    date_created: "",
  };


  let headings = [
    "Customer Name",
    "Description",
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
  let [transactionLogs, setTransactionLogs] = useState([])
  let [totalSale, setTotalSale] = useState(0)
  let [pendingFilter, setPendingFilter] = useState(false)

  useEffect(() => {
    if (sales) {
      sales.map((item) => {
        let data = {
          _id: item._id,
          customer_name: item.customer.customer_name + " ( " + item.customer.contact + " )",
          description: item.customer.description,
          order_number: new Date(item.date_created).getTime(),
          total_products: item.products.length,
          total_payment: item.total_price,
          pending_payment: item.pending_payment,
          date_created: new Date(item.date_created).toLocaleDateString(),
          customer_data: item.customer,
          products_data: item.products,
        }
        let startDate = new Date(new Date(state[0].startDate).toDateString())
        let endDate = new Date(new Date(state[0].endDate).toDateString())
        let saleDate = new Date(new Date(item.date_created).toDateString())

        if (startDate <= saleDate && endDate >= saleDate) {
          if (pendingFilter) {
            if (data.pending_payment > 0) {
              saleData.push(data)

            }
          }
          if (!pendingFilter) {
            saleData.push(data)
          }
        }
      })
    }
  }, [state, sales, pendingFilter])
  useEffect(() => {
    let newArr = []
    let total = 0
    if (allLogs) {
      allLogs.map((item) => {
        let startDate = new Date(new Date(state2[0].startDate).toDateString())
        let endDate = new Date(new Date(state2[0].endDate).toDateString())
        let saleDate = new Date(new Date(item.TIMESTAMP).toDateString())
        if (startDate <= saleDate && endDate >= saleDate) {
          total = total + parseInt(item.PAYMENT)
          newArr.push(item);
        }
      })
      setTransactionLogs(newArr)
      setTotalSale(total)
    }
  }, [state2, allLogs])


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
                  class="fa fa-edit"
                  onClick={() => handleEditReport(row)}
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
  }, [sales, state, pendingFilter]);
  const [formData, setFormData] = useState({
    total_sale: "",
    total_profit: ""
  })
  useEffect(() => {
    if (datatable) {
      formData.total_sale = 0;
      formData.total_profit = 0;
      setFormData({ ...formData, total_profit: 0, total_sale: 0 })
      setFormData({})
      datatable.rows.map((item) => {
        formData.total_sale = formData.total_sale + parseInt(item.total_payment)
        formData.total_profit = formData.total_profit + parseInt(item.sale_profit)
        console.log(item.sale_profit)
        console.log(item.total_payment)
      })
      setFormData({ ...formData, total_profit: formData.total_profit, total_sale: formData.total_sale })
      console.log(formData)
    }
  }, [datatable])


  console.log(formData)



  const handleChangePending = (e) => {
    if (e.target.value == 'all') {
      setPendingFilter(false)
    }
    else {
      setPendingFilter(true)
    }
  }


  const handleDeleteReport = async (row) => {

    setSelectedSale(row);
    gContext.toggleDeleteModal("SALES");

  };
  const handlePayment = async (row) => {

    setSelectedSale(row);
    gContext.togglePaymentModal();

  };

  const handleViewDetail = (row) => {

    setSelectedSale(row);
    Router.push("/reports/sale/detail");
  };
  const handleEditReport = (row) => {

    setSelectedSale(row);
    Router.push("/reports/sale/edit");
  };


  return (
    <PageWrapper
      headerConfig={{
        button: "profile",
        isFluid: true,
        bgClass: "bg-default",
        reveal: false,
      }}
    >
      <div
        className="dashboard-main-container  mt-24 mt-lg-16"
        id="dashboard-body"
      >
        <div className="container">
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
            />

            <input
              type="button"
              value="Add Sale"
              onClick={() => Router.push('/forms/sale')}
              className="btn btn-green btn-h-10 text-white min-width-px-100 float-right mt-6 rounded-5 text-uppercase"
            />


            <div className="col-lg-4 mt-5 pl-0">
              <select onChange={e => handleChangePending(e)} className='form-control'>
                <option value='all'>All</option>
                <option value='pending'>Pending</option>
              </select>
            </div>
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
          <div class='row mb-20'>
            <div class="col-lg-4">
              <div class="input-group input-group-default">
                <span class="input-group-text" style={{ height: '48px' }} id="inputGroup-sizing-default">Total Sale</span>
                <input type="text" class="form-control" value={formData.total_sale} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>



          </div>
          <div style={{ textAlign: 'center' }}>
            <ReactToPrint


              trigger={() => {
                return <input
                  type="button"
                  value="Print" id='printButton'

                  className="btn btn-green btn-h-30 text-white min-width-px-60 rounded-5 text-uppercase"
                />
              }}
              content={() => document.getElementById("printBodyView")}
            />
          </div>
          <div id='printBodyView' className="bg-white pt-9 pb-7 px-5 rounded-4 mb-9 feature-cardOne-adjustments w-100">
            <div style={{ textAlign: 'center' }}>
              <h3>Umair Store</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h5>By {user && user.name}</h5>
            </div>
            <div style={{ textAlign: 'center', marginTop: "20px", lineHeight: "6px" }}>
              <p>{new Date(state[0].startDate).toDateString()} - {new Date(state[0].endDate).toDateString()} </p>
            </div>
            <div>
              <table className="table ">
                <thead class="thead">
                  <th scope='col' className="pl-1  border-0 font-size-4 font-weight-bold">Customer</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Order#</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Total Products</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Total Payment</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Pending Payment</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Date Created</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Remarks</th>
                </thead>
                <tbody>


                  {datatable && datatable.rows && datatable.rows.map((item) => (
                    <tr className="">
                      <td className="table-y-middle py-7 min-width-px-100">{item.customer_name}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.order_number}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.total_products}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.total_payment}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.pending_payment}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.date_created}</td>
                      <td className="table-y-middle py-7 min-width-px-100"> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>





          <div className="table-responsive">
            <DateRangePicker
              onChange={item => setState2([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state2}
              direction="horizontal"
            />
            <div class='row'>
              <div className='col-lg-4'>
                <label
                  htmlFor="password"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Total Recovery
                    </label>
                <input className="form-control" value={totalSale} />
              </div>
            </div>

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
                    Order#
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
                  transactionLogs && transactionLogs.map((item) => (
                    <tr className="border border-color-2">
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.CUSTOMER && item.CUSTOMER.customer_name}</td>
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.CUSTOMER && item.CUSTOMER.contact}</td>
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{item && item.ORDER_NUMBER}</td>
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
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  sales: state.sale.sales,
  products: state.product.products,
  allLogs: state.logs.transactionLogs
});
export default connect(mapStateToProps, { getProducts, deleteProduct, setSelectedSale, editProduct })(
  finance
);
