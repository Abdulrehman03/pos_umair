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
    customer_name: "",
    total_products: "",
    total_payment: "",
    sale_profit: "",
    date_created: "",
  };


  let headings = [
    "Customer Name",
    "Total Products",
    "Total Payment",
    "Sale Profit",
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



  let saleData = []
  useEffect(() => {
    if (sales) {
      sales.map((item) => {
        let data = {
          _id: item._id,
          customer_name: item.customer.customer_name,
          total_products: item.products.length,
          total_payment: item.total_price,
          sale_profit: item.sale_profit,
          date_created: new Date(item.date_created).toLocaleDateString(),
          customer_data: item.customer,
          products_data: item.products,
        }
      
        let startDate = new Date(new Date(state[0].startDate).toDateString())
        let endDate = new Date(new Date(state[0].endDate).toDateString())
        let saleDate = new Date(new Date(item.date_created).toDateString())
        // console.log(startDate)
        // console.log(endDate)
        // console.log(saleDate)

        if (startDate <= saleDate && endDate >= saleDate) {
          saleData.push(data)
        }
      })
    }
  }, [state, sales])


  // console.log(sales)
  useEffect(() => {
    if (saleData) {
      setDatatable({
        ...datatable,
        rows: [
          ...saleData.map((row, order) => ({
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
        console.log(item.sale_profit)
        console.log(item.total_payment)
      })
      setFormData({ ...formData, total_profit: formData.total_profit, total_sale: formData.total_sale })
      console.log(formData)
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
          <h5 style={{ color: "#00b074" }}>Profits</h5>

          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />;
          {/* <div style={styles.csv/Button}> */}

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
            <div class="col-lg-6">
              <div class="input-group input-group-default">
                <span class="input-group-text" style={{ height: '48px' }} id="inputGroup-sizing-default">Total Sale</span>
                <input type="text" class="form-control" value={formData.total_sale} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>

            <div class="col-lg-6">
              <div class="input-group input-group-default">
                <span class="input-group-text" style={{ height: '48px' }} id="inputGroup-sizing-default">Total Profit</span>
                <input type="text" value={formData.total_profit} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
              </div>
            </div>

          </div>
        </div>


      </div>
    </PageWrapper >
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
