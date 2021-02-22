import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { connect } from "react-redux";
import { deleteProduct, editProduct } from "../../store/actions/product";
import { deleteSale } from "../../store/actions/sale";
import { deleteCustomer } from "../../store/actions/customer";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } 
  .modal-dialog {
    margin: 1.75rem auto;
    max-width: 100%;
  }
  .modal-content {
    background: transparent;
  }*/
`;

const ModalDelete = (props) => {
  const {

    deleteProduct,
    selectedProduct,
    deleteSale,
    selectedSale,
    products,
    editProduct,
    selectedCustomer,
    deleteCustomer
  } = props;
  const [deleteWarning, setDeleteWarning] = useState({
    id: "",
    flag: false,
  });
  const gContext = useContext(GlobalContext);
  const handleClose = () => {
    setDeleteWarning({ id: "", flag: false });
    console.log(deleteWarning);
    gContext.toggleDeleteModal();
  };

  const handleDelete = async () => {

    if (gContext.deleteModalVisible.category == "Products") {
      console.log(selectedProduct);
      console.log(gContext.deleteModalVisible.category);
      deleteProduct(selectedProduct._id);
      gContext.toggleDeleteModal();
    }
    if (gContext.deleteModalVisible.category == "Customer") {
      console.log(selectedCustomer);
      console.log(gContext.deleteModalVisible.category);
      deleteCustomer(selectedCustomer._id);
      gContext.toggleDeleteModal();
    }
    if (gContext.deleteModalVisible.category == "SALES") {
      selectedSale.products_data.map(async (product) => {
        console.log(product)
        let inventoryProduct = products.find((item) => {
          return item._id == product._id
        })
        let quantity = inventoryProduct.quantity + parseInt(product.selected_quantity);
        console.log(inventoryProduct);
        console.log(quantity);
        let data = {
          _id: product._id,
          quantity: quantity
        }
        await editProduct(data, "cart")
      })

      deleteSale(selectedSale._id);
      gContext.toggleDeleteModal();
    }

    // gContext.toggleDeleteModal();
  }



  return (
    <ModalStyled
      {...props}
      size="md"
      centered
      show={gContext.deleteModalVisible.flag}
      onHide={gContext.toggleDeleteModal}
    >
      <Modal.Body className="p-0">
        <div className="container position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="container mt-10 mb-10" id="dashboard-body">
            {deleteWarning.flag ? (
              <>
                <h4 style={{ color: "#f71e3f", marginBottom: "20px" }}>
                  Are you sure?
                </h4>
                <p>It will also delete other data related to this</p>
              </>
            ) : (
                <>
                  <h4 style={{ color: "#00b074", marginBottom: "20px" }}>
                    Warning
                </h4>
                  <p>Are you sure you want to Delete ? </p>
                </>
              )}

            <div className="row">
              <div className="col-md-4">
                <input
                  type="button"
                  value="Cancel"
                  onClick={handleClose}
                  className="btn btn-white bg-dark  text-white  rounded-5 text-uppercase"
                />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input
                  type="button"
                  value="Delete"
                  onClick={!deleteWarning.flag ? handleDelete : confirmDelete}
                  className="btn btn-red  text-white  rounded-5 text-uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

const mapStateToProps = (state) => ({

  selectedProduct: state.product.selectedProduct,
  selectedCustomer: state.customer.selectedCustomer,
  selectedSale: state.sale.selectedSale,
  products: state.product.products
});

export default connect(mapStateToProps, {

  deleteProduct,
  deleteSale,
  editProduct,
  deleteCustomer
})(ModalDelete);
