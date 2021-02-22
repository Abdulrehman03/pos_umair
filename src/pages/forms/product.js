import React, { useState, useEffect } from "react";

import PageWrapper from "../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";
import { addProduct } from "../../store/actions/product";


const Sourcing = ({
  addProduct,
  isAuthenticated,
  user

}) => {


  const [formData, setFormData] = useState({
    barcode: '',
    product_name: "",
    cost_price: "",
    sale_price: "",
    quantity: "",
  });
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && user.email != 'admin@mail.com') {
      Router.push("/dashboard-main");
    }
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addProduct(formData);

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
          className="dashboard-main-container mt-lg-15"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Create Product
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
                                Bar Code
                              </label>
                              <input
                                name="barcode"
                                onChange={(e) => onChange(e)}
                                value={formData.barcode}
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
                                Name
                              </label>
                              <input
                                name="product_name"
                                onChange={(e) => onChange(e)}
                                value={formData.product_name}
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
                                Cost Price
                              </label>
                              <input
                                name="cost_price"
                                onChange={(e) => onChange(e)}
                                value={formData.cost_price}
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
                                Sale Price
                              </label>
                              <input
                                name="sale_price"
                                onChange={(e) => onChange(e)}
                                value={formData.sale_price}
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
                                Quantity
                              </label>
                              <input
                                name="quantity"
                                onChange={(e) => onChange(e)}
                                value={formData.quantity}
                                type="number"
                                min={0}
                                required
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
                              value="Create"
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
  user: state.auth.user
});
export default connect(mapStateToProps, { addProduct })(Sourcing);
