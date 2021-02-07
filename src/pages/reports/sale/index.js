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





const finance = ({
  isAuthenticated,
  getProducts,
  sales,
  setSelectedSale,
  products,
  editProduct,
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
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  let tabValues = {
    customer_name: "",
    total_products: "",
    total_payment: "",
    pending_payment: "",
    date_created: "",
  };


  let headings = [
    "Customer Name",
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
        let data = {
          _id: item._id,
          customer_name: item.customer.customer_name,
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

  const handleViewDetail = (row) => {
    console.log(row);
    setSelectedSale(row);
    Router.push("/reports/sale/detail");
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
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sales: state.sale.sales,
  products: state.product.products,
});
export default connect(mapStateToProps, { getProducts, deleteProduct, setSelectedSale, editProduct })(
  finance
);
