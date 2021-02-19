import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import ProfileSidebar from "../ProfileSidebar";
import { editSale } from '../../store/actions/sale'
import { toast } from "react-toastify";

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
  const { selectedSale, editSale, user } = props
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.togglePaymentModal();
  };

  const [formData, setFormData] = useState({
    payment: ''
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedSale.pending_payment >= parseInt(formData.payment)) {
      let data = {
        _id: selectedSale._id,
        pending_payment: selectedSale.pending_payment - parseInt(formData.payment)
      }
      let data2 = {
        SALE_id: selectedSale._id,
        CUSTOMER: selectedSale.customer_data,
        PAYMENT: formData.payment,
        ORDER_NUMBER: new Date(selectedSale.date_created).getTime(),
        CREATED_BY: user && user._id
      }
      console.log(data)
      console.log(data2)
      editSale(data, data2)
    }
    else {
      toast.error("Failed!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
    gContext.togglePaymentModal();


  };
  return (
    <ModalStyled
      {...props}
      size="xs"
      centered
      show={gContext.paymentModalVisible}
      onHide={gContext.togglePaymentModal}
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
                    Payment
                  </a>
                </h2>

                <div className="row mb-xl-1 mb-9">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label
                        htmlFor="aboutTextarea"
                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                      >
                        Ammount to Pay
                     </label>
                      <input
                        name="payment"
                        onChange={(e) => onChange(e)}
                        value={formData.payment}
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
                    Pay
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

  selectedSale: state.sale.selectedSale,
  user: state.auth.user
});

export default connect(mapStateToProps, { editSale })(ModalSignIn);