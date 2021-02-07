import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import ProfileSidebar from "../ProfileSidebar";
import { editProductQuantity } from '../../store/actions/product'

import { connect } from 'react-redux'

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
  .modal-dialog {
    margin: 1.75rem auto;
    max-width: 100%;
  } 
  .modal-content {
    background: transparent;
  }
`;

const ModalSignIn = (props) => {
  const { selectedProduct, editProductQuantity } = props
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.toggleApplicationModal();
  };


  const [formData, setFormData] = useState({
    quantity: ''
  })



  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(selectedProduct);
    let quantity = selectedProduct.quantity + parseInt(formData.quantity)
    let data = {
      _id: selectedProduct._id,
      quantity: quantity
    }
    let data2 = {
      PRODUCT_NAME: selectedProduct.product_name,
      QUANTITY: formData.quantity
    }
    console.log(selectedProduct);
    editProductQuantity(data, data2)
    console.log(data);
    gContext.toggleApplicationModal();
  };
  return (
    <ModalStyled
      {...props}
      size="xs"
      centered
      show={gContext.applicationModalVisible}
      onHide={gContext.toggleApplicationModal}
    >
      <Modal.Body className="p-0">
        <div style={{ maxWidth: "400px" }} className="container position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="login-modal-main bg-white rounded-8 overflow-hidden">
            <div className="row no-gutters">

              {/* <!-- Start Feature One --> */}
              <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">

                <a className="font-size-3 d-block mb-0 text-gray">
                  {/* No. {saleData && saleData.customer_data && saleData.customer_data.contact} */}
                </a>

                <h2 className="mt-n4">

                  <a className="font-size-7 text-black-2 font-weight-bold mb-4">
                    Add Quantity
                  </a>
                </h2>

                <div className="row mb-xl-1 mb-9">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label
                        htmlFor="aboutTextarea"
                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                      >
                        Quantity
                     </label>
                      <input
                        name="quantity"
                        onChange={(e) => onChange(e)}
                        value={formData.quantity}
                        type="number"
                        required
                        className="form-control h-px-48"
                        id="namedash"
                      // placeholder="Enter Email"
                      />
                    </div>
                  </div>
                </div>
                <ul className="list-unstyled mb-1 card-tag-list">

                  <li>

                    <a style={{ cursor: "pointer" }} onClick={e => onSubmit(e)} className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                      <i className="fa fa-plus mr-2 font-weight-bold"></i>{" "}
                    Add
                  </a>

                  </li>

                </ul>
              </div>
              {/* <!-- End Feature One --> */}

            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};


const mapStateToProps = (state) => ({

  selectedProduct: state.product.selectedProduct,
});

export default connect(mapStateToProps, { editProductQuantity })(ModalSignIn);