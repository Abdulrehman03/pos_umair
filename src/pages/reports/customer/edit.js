import React, { useState, useEffect } from "react";

import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";
import { editCustomer } from "../../../store/actions/customer";
import { v4 as uuidv4 } from "uuid";


const Sourcing = ({
  editCustomer,
  isAuthenticated,
  selectedCustomer

}) => {


  const [formData, setFormData] = useState({
    _id: "",
    customer_name: "",
    contact: "",
    address: "",
    description: "",
  });
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setFormData({

      _id: selectedCustomer._id,
      customer_name: selectedCustomer.customer_name,
      contact: selectedCustomer.contact,
      address: selectedCustomer.address,
      description: selectedCustomer.description,
    })
  }, [selectedCustomer])
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    editCustomer(formData);

  };


  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false,
        }}
      >
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Edit Customer
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    <form action="" onSubmit={(e) => onSubmit(e)}>
                      <fieldset>

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Customer Name
                              </label>
                              <input
                                name="customer_name"
                                onChange={(e) => onChange(e)}
                                value={formData.customer_name}
                                type="text"
                                required
                                className="form-control h-px-48"
                                id="namedash"
                              // placeholder="Enter Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Address
                              </label>
                              <input
                                name="address"
                                onChange={(e) => onChange(e)}
                                value={formData.address}
                                type="text"
                                required
                                className="form-control h-px-48"
                                id="namedash"
                              // placeholder="Enter Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Contact #
                              </label>
                              <input
                                name="contact"
                                onChange={(e) => onChange(e)}
                                value={formData.contact}
                                type="number"
                                required
                                className="form-control h-px-48"
                                id="namedash"
                              // placeholder="Enter Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="aboutTextarea"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Description
                              </label>
                              <input
                                name="description"
                                onChange={(e) => onChange(e)}
                                value={formData.description}
                                type="text"

                                className="form-control h-px-48"
                                id="namedash"
                              // placeholder="Enter Email"
                              />
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-12">
                            <input
                              type="button"
                              value="Edit"
                              type="submit"
                              className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                            />
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  selectedCustomer: state.customer.selectedCustomer

});
export default connect(mapStateToProps, { editCustomer })(Sourcing);



