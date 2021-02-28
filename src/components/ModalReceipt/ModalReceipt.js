import React, { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import ProfileSidebar from "../ProfileSidebar";
import { editSale } from '../../store/actions/sale'

import { connect } from 'react-redux'
import { textAlign } from "styled-system";
import ReactToPrint from 'react-to-print';

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
const pageStyle = `
  @page {
    size: 10mm 10mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;
const ModalReceipt = (props) => {

  const { selectedSale, editSale, user } = props
  const gContext = useContext(GlobalContext);

  const handleClose = () => {
    gContext.toggleReceiptModal();
  };

  console.log(selectedSale)

  const handlePrint = () => {
    document.getElementById('printBody')
    console.log(document.getElementById('printBody'))
  }

  return (
    <ModalStyled
      {...props}
      size="md"
      centered
      show={gContext.receiptModalVisible}
      onHide={gContext.toggleReceiptModal}
    >

      <Modal.Body className="p-0" >
        <div style={{ maxWidth: "500px" }} id='printBody' className="container position-relative">
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
              <div className="bg-white pt-9 pb-7 px-5 rounded-4 mb-9 feature-cardOne-adjustments w-100">


                <div style={{ textAlign: 'center' }}>
                  <h3>Umair Store</h3>

                </div>
                <div style={{ textAlign: 'center' }}>
                  <h5>{selectedSale && selectedSale.customer && selectedSale.customer.customer_name}</h5>
                  <p>{selectedSale && selectedSale.customer && selectedSale.customer.contact}</p>

                </div>
                <div style={{ textAlign: 'center', marginTop: "20px", lineHeight: "6px" }}>
                  <p>Invoice# {selectedSale && new Date(selectedSale.created_at).getTime()}</p>
                  <p>Date : {selectedSale && new Date(selectedSale.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <table className="table ">
                    <thead class="thead">
                      <th scope='col' className="pl-1  border-0 font-size-4 font-weight-bold">Product</th>
                      <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Price</th>
                      <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Qty.</th>
                      <th scope='col' className="pl-0  border-0 font-size-4 font-weight-bold">Total</th>
                    </thead>
                    <tbody>


                      {selectedSale && selectedSale.products && selectedSale.products.map((item) => (
                        <tr className="">
                          <td className="table-y-middle py-7 min-width-px-100">{item.product_name}</td>
                          <td className="table-y-middle py-7 min-width-px-100">{item.sale_price}</td>
                          <td className="table-y-middle py-7 min-width-px-100">{item.selected_quantity}</td>
                          <td className="table-y-middle py-7 min-width-px-100">{item.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border border-color-2">
                        <th className="table-y-middle py-7 font-size-4 font-weight-bold min-width-px-100" colSpan='3'> Grand Total</th>
                        <td className="table-y-middle py-7 min-width-px-100"> {selectedSale && selectedSale.total_price}</td>
                      </tr>
                      <tr className="border border-color-2">
                        <th className="table-y-middle py-7 font-size-4 font-weight-bold min-width-px-100" colSpan='3'> Previous Pending Amount</th>
                        <td className="table-y-middle py-7 min-width-px-100"> {selectedSale && selectedSale.pending_payment}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <ReactToPrint
                    pageStyle={
                      pageStyle
                    }
                    
                    trigger={() => {
                      return <input
                        type="button"
                        value="Print" id='printButton'

                        className="btn btn-green btn-h-30 text-white min-width-px-60 rounded-5 text-uppercase"
                      />
                    }}
                    content={() => document.getElementById("printBody")}
                  />
                </div>

              </div>
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

export default connect(mapStateToProps, { editSale })(ModalReceipt);