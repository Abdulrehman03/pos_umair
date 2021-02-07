import React, { useState, useEffect, useContext } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Router from "next/router";
import { getProducts, deleteProduct, setSelectedProduct } from "../../../store/actions/product";
import GlobalContext from "../../../context/GlobalContext";
import { CSVLink } from "react-csv";



const finance = ({
  isAuthenticated,
  getProducts,
  customers,
  setSelectedProduct,
  deleteProduct
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

  let tabValues = {
    customer_name: "",
    contact: "",
    address: "",
    description: "",
  };


  let headings = [
    "Customer Name",
    "Contact #",
    "Address",
    "Description",
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
  useEffect(() => {
    if (customers) {
      setDatatable({
        ...datatable,
        rows: [
          ...customers.map((row, order) => ({
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
  }, [customers]);

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
    Router.push("/reports/finance/detail");
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
        className="dashboard-main-container  mt-24 mt-lg-25"
        id="dashboard-body"
      >
        <div className="container">
          <h5 style={{ color: "#00b074" }}>Customers</h5>
          {/* <div style={styles.csv/Button}> */}
          <div>
            {/* <CSVLink filename={"finance-data.csv"} data={datatable.rows}>
              CSV
            </CSVLink> */}
            <input
              type="button"
              value="Add Customer"
              onClick={() => Router.push('/forms/customer')}
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
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  customers: state.customer.customers,
});
export default connect(mapStateToProps, { getProducts, deleteProduct, setSelectedProduct })(
  finance
);
