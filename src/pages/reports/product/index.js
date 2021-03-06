import React, { useState, useEffect, useContext } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Router from "next/router";
import { getProducts, deleteProduct, setSelectedProduct } from "../../../store/actions/product";
import GlobalContext from "../../../context/GlobalContext";
import { CSVLink } from "react-csv";
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns';

const finance = ({
  isAuthenticated,
  getProducts,
  products,
  setSelectedProduct,
  deleteProduct,
  logs,
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
  const [allLogs, setAllLogs] = useState(logs)
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



  useEffect(() => {
    if (user && user.email != 'admin@mail.com') {
      Router.push("/dashboard-main");
    }
  }, [user]);

  let financeObj = {
    barcode: "",
    product_name: "",
    cost_price: "",
    sale_price: "",
    quantity: "",
  };
  let financeName = [
    "Barcode #",
    "Product Name",
    "Cost Price",
    "Sale Price",
    "Quantity",
  ];
  let allColumns = [];
  Object.keys(financeObj).map((key, index) => {
    let data = {
      label: financeName[index],
      field: key,
      width: 200,
    };
    allColumns.push(data);
  });
  console.log(products);
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
  useEffect(() => {
    if (products) {
      setDatatable({
        ...datatable,
        rows: [
          ...products.map((row, order) => ({
            ...row,
            badge: (
              <>
                <i
                  style={{ cursor: "pointer" }}
                  class="fas fa-bars"
                  onClick={() => handleViewDetail(row)}
                ></i>
                &nbsp; &nbsp;
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditReport(row)}
                  class="fas fa-edit"
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
  }, [products]);

  const handleEditReport = (row) => {
    console.log(row);
    setSelectedProduct(row);
    Router.push("/reports/product/edit");
  };
  const handleDeleteReport = (row) => {
    console.log(row);
    setSelectedProduct(row);
    gContext.toggleDeleteModal("Products");
  };
  const handleViewDetail = (row) => {
    console.log(row);
    setSelectedProduct(row);
    gContext.toggleApplicationModal("Products");
  };


  useEffect(() => {
    console.log(state)
    let startDate = new Date(new Date(state[0].startDate).toDateString())
    let endDate = new Date(new Date(state[0].endDate).toDateString())

    let filtered = logs.filter((item) => {
      let saleDate = new Date(new Date(item.TIMESTAMP).toDateString())
      return startDate <= saleDate && endDate >= saleDate
    })
    setAllLogs(filtered)
    console.log(filtered)
  }, [logs, state])

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
        className="dashboard-main-container  mt-24 mt-lg-25"
        id="dashboard-body"
      >
        <div className="container">
          <h5 style={{ color: "#00b074" }}>Products</h5>
          <div>

            <input
              type="button"
              value="Add Product"
              onClick={() => Router.push('/forms/product')}
              className="btn btn-green btn-h-10 text-white min-width-px-100 float-right mt-6 rounded-5 text-uppercase"
            />
          </div>
          <MDBDataTable
            hover
            entriesOptions={[5, 20, 25]}
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

          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />


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
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  products: state.product.products,
  logs: state.logs.allLogs
});
export default connect(mapStateToProps, { getProducts, deleteProduct, setSelectedProduct })(
  finance
);
