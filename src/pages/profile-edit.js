import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageWrapper from "../components/PageWrapper";

import Router from "next/router";
import Loader from "../components/Loader/index";

const EditProfile = ({ user, isAuthenticated ,loading}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  });

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
         {loading && <Loader />}
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-bold mb-11">
                    Edit Profile
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    <form action="/">
                      <fieldset>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                disabled
                                value={user && user.name}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                disabled
                                value={user && user.email}
                                id="namedash"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Password
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                type="password"
                                disabled
                                value="asdasda"
                                id="namedash"
                              />
                            </div>
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
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(EditProfile);
