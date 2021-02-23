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
  allLogs,
  setSelectedSale,
  products,
  editProduct,
  deleteProduct,
  user
}) => {
  console.log(allLogs)

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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  // console.log(state)
  const gContext = useContext(GlobalContext);
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
    getProducts();
  }, [isAuthenticated]);

  let tabValues = {
    barcode: "",
    product_name: "",
    selected_quantity: "",

  };



  let headings = [
    "Bar Code",
    "Product Name",
    "Quantity",
   

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
  const [formData, setFormData] = useState({
    total_sale: "",
    total_profit: ""
  })
  const [datatable, setDatatable] = React.useState({
    columns: [
      ...allColumns,
    ],
    rows: [],
  });



  let productsData = []
  useEffect(() => {
    if (sales) {
      sales.map((item) => {
        let startDate = new Date(new Date(state[0].startDate).toDateString())
        let endDate = new Date(new Date(state[0].endDate).toDateString())
        let saleDate = new Date(new Date(item.date_created).toDateString())

        if (startDate <= saleDate && endDate >= saleDate) {
          item.products.map((product) => {
            let data = {
              ...product
            }
            let check = productsData.find((prod) => {
              if (prod._id == data._id) {
                prod.selected_quantity = parseInt(prod.selected_quantity) + parseInt(data.selected_quantity)
                console.log(prod)
                return true
              }
            })
            if (!check) {
              productsData.push(data)
            }
          })
        }
      })
    }
  }, [state, sales])



  useEffect(() => {
    if (productsData) {
      setDatatable({
        ...datatable,
        rows: [
          ...productsData.map((row, order) => ({
            ...row,
          })),
        ],
      });
    }
  }, [sales, state]);


  useEffect(() => {
    if (datatable) {

      formData.total_sale = 0;
      formData.total_profit = 0;
      setFormData({ ...formData, total_profit: 0, total_sale: 0 })
      setFormData({})
      datatable.rows.map((item) => {
        formData.total_sale = formData.total_sale + parseInt(item.total_payment)
        formData.total_profit = formData.total_profit + parseInt(item.sale_profit)
      })
      setFormData({ ...formData, total_profit: formData.total_profit, total_sale: formData.total_sale })
    }
  }, [datatable])

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
        className="dashboard-main-container  mt-24 mt-lg-17"
        id="dashboard-body"
      >
        <div className="container">
          <h5 style={{ color: "#00b074" }}>Product Sales</h5>

          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
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
          <ReactToPrint
            trigger={() => {
              return <input
                type="button"
                value="Print"

                className="btn btn-green btn-h-30 text-white min-width-px-60 rounded-5 text-uppercase"
              />
            }}
            content={() => document.getElementById("printBodyView")}
          />
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
                  <th scope='col' className="pl-1  border-0 font-size-4 font-weight-bold">Barcode</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Product Name</th>
                  <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Quantity</th>

                </thead>
                <tbody>


                  {datatable && datatable.rows && datatable.rows.map((item) => (
                    <tr className="">
                      <td className="table-y-middle py-7 min-width-px-100">{item.barcode}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.product_name}</td>
                      <td className="table-y-middle py-7 min-width-px-100">{item.selected_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


          </div>


          <h5 style={{ color: "#00b074" }}>Logs</h5>
          <div className="table-responsive">
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
                    Quantity Added
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
                  allLogs && allLogs.map((item) => (
                    <tr className="border border-color-2">
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.PRODUCT_NAME}</td>
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{item.QUANTITY}</td>
                      <td scope="row" className="pl-6 border-0 py-7 pr-0">{new Date(item.TIMESTAMP).toLocaleString()}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>


      </div>
    </PageWrapper >
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  sales: state.sale.sales,
  products: state.product.products,
  allLogs: state.logs.allLogs
});
export default connect(mapStateToProps, { getProducts, deleteProduct, setSelectedSale, editProduct })(
  finance
);
