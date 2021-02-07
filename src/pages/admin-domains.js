import React, { useEffect, useState } from "react";

import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import Link from "next/link";
import { connect } from "react-redux";
import Head from "next/head";
import { editDomains } from "../store/actions/domains";
import Badge from "../components/Core/Badge";
import Switch from "../components/Core/Switch";
import Loader from "../components/Loader";
import Router from "next/router";

import SearchReact from 'react-select'


const DashboardSettings = ({
  domains,
  loading,
  editDomains,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  });
  let classes = {
    badge: {
      marginTop: "20px",
      width: "80px",
    },
    switch: {
      marginTop: "5px",
    },
    loadingDiv: {
      width: "100vw",
      height: "100vh",
      textAlign: "center",
    },
  };
  const [formData, setFormData] = useState({
    newSubsegment: "",
    newDomain: "",
    newSegment: "",
  });
  const [selectedDomain, setSelectedDomain] = useState("TECHNOLOGY");
  const [selectedSegment, setSelectedSegment] = useState({
    label:'ERP',
    value:"ERP"
  });
  const [allDomains, setAllDomains] = useState();
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showAddSegment, setShowAddSegment] = useState(false);
  const [showAddField, setShowAddField] = useState(false);
  useEffect(() => {
    if (domains) {
      setAllDomains(domains[0].Domain);
    }
  }, [domains]);
  console.log(allDomains);

  const onSelectDomain = (e) => {
    console.log();
    if (allDomains[e.target.value] != null) {
      let data= {label:Object.keys(allDomains[e.target.value])[0],value:Object.keys(allDomains[e.target.value])[0]}
      setSelectedSegment(data);
    } else {
      setSelectedSegment("");
    }

    setSelectedDomain(e.target.value);
    // console.log(Object.keys(allDomains[e.target.value])[0]);
  };
  const onSelectSegment = (e) => {
    console.log("Segment changed");
    console.log(e)
    setSelectedSegment(e);
  };
  const handleShowAddField = () => {
    setShowAddField(!showAddField);
  };
  const onChangeField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onAddDomain = (e) => {
    allDomains[formData.newDomain] = null;

    let data = {
      Domain: allDomains,
    };
    formData.newDomain = "";
    editDomains(data, "Domain");
    setShowAddDomain(false);
  };
  const onAddSegment = (e) => {
    if (allDomains[selectedDomain] == null) {
      allDomains[selectedDomain] = {};
    }
    allDomains[selectedDomain][formData.newSegment] = [];

    let data = {
      Domain: allDomains,
    };
    formData.newSegment = "";
    editDomains(data, "Segment");
    setShowAddSegment(false);
  };
  const onAddSubSegment = (e) => {
    console.log(allDomains[selectedDomain][selectedSegment.label]);
    if (allDomains[selectedDomain][selectedSegment.label] == undefined) {
      allDomains[selectedDomain][selectedSegment.label] = [];
      allDomains[selectedDomain][selectedSegment.label].unshift(
        formData.newSubsegment
      );
    } else {
      allDomains[selectedDomain][selectedSegment.label].unshift(
        formData.newSubsegment
      );
    }
    let data = {
      Domain: allDomains,
    };
    formData.newSubsegment = "";
    editDomains(data, "Subsegment");
    setShowAddField(false);
  };

  const onDeleteSubsegment = (index) => {
    allDomains[selectedDomain][selectedSegment.label].splice(index, 1);
    setAllDomains(allDomains);
    let data = {
      Domain: allDomains,
    };
    editDomains(data, "Subsegment", "delete");
  };
  
  const optionsSegment = [];
  if (allDomains) {
    allDomains[selectedDomain] != null &&
      Object.keys(allDomains[selectedDomain]).map((segment) => {
        let data = { label: segment, value: segment };
        optionsSegment.push(data);
      });
  }
  console.log(optionsSegment)
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
        <Head>
          <script src="https://apis.google.com/js/api.js"></script>
        </Head>
        {loading && <Loader />}
        <div
          className="dashboard-main-container mt-24 mt-lg-31"
          id="dashboard-body"
        >
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-11">
                    Add Segments
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    <form action="/">
                      <fieldset>
                        {/* Dropdown Domain*/}

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-8 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="select3"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Domains
                              </label>

                              <select
                                onChange={(e) => onSelectDomain(e)}
                                id="dropdowns"
                                className="form-control p-5 arrow-3  w-100 font-size-4 d-flex align-items-center w-100"
                              >
                                {allDomains &&
                                  Object.keys(allDomains).map(
                                    (domain, index) => (
                                      <option id="domainOption" value={domain}>
                                        {domain}
                                      </option>
                                    )
                                  )}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-4 mt-10 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <input
                                type="button"
                                value="Add Domain"
                                className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                onClick={() => setShowAddDomain(!showAddDomain)}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Dropdown Domain Ends */}

                        {/* Add Domain Starts */}
                        {showAddDomain && (
                          <div className="row mb-xl-1 mb-9">
                            <div className="col-lg-8 mb-xl-0 mb-7">
                              <div className="form-group position-relative">
                                <label
                                  htmlFor="select3"
                                  className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                >
                                  Add Domain
                                </label>
                                <input
                                  type="text"
                                  className="form-control h-px-48"
                                  id="newValue"
                                  name="newDomain"
                                  value={formData.newDomain}
                                  onChange={(e) => onChangeField(e)}
                                  placeholder="Enter new Option"
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 mt-10 mb-xl-0 mb-7">
                              <div className="form-group position-relative">
                                <input
                                  type="button"
                                  value="Add"
                                  className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                  onClick={(e) => onAddDomain(e)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Add Domain Ends */}

                        {/* Dropdown Segments Starts */}

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-8 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="select3"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Segments
                              </label>
                              <form onSubmit={(e)=>e.preventDefault()}>
                                <SearchReact
                                 options={optionsSegment}
                                 value={selectedSegment}
                                 onChange={(e) => onSelectSegment(e)}

                                />
                           
                              </form>
                             
                            
                            </div>
                          </div>
                          <div className="col-lg-4 mt-10 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <input
                                type="button"
                                value="Add Segment"
                                className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                onClick={() =>
                                  setShowAddSegment(!showAddSegment)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* Dropdown Segments Ends */}

                        {/* Add Segments Starts */}

                        {showAddSegment && (
                          <div className="row mb-xl-1 mb-9">
                            <div className="col-lg-8 mb-xl-0 mb-7">
                              <div className="form-group position-relative">
                                <label
                                  htmlFor="select3"
                                  className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                >
                                  Add Segment
                                </label>
                                <input
                                  type="text"
                                  className="form-control h-px-48"
                                  id="newValue"
                                  name="newSegment"
                                  value={formData.newSegment}
                                  onChange={(e) => onChangeField(e)}
                                  placeholder="Enter new Option"
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 mt-10 mb-xl-0 mb-7">
                              <div className="form-group position-relative">
                                <input
                                  type="button"
                                  value="Add"
                                  className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                  onClick={(e) => onAddSegment(e)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Add Segments Ends */}

                        {/* Table Starts */}
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-11 mb-xl-0 ml-5 mb-7">
                            {allDomains && (
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th
                                      scope="col"
                                      className="pl-0  border-0 font-size-4 font-weight-normal"
                                    >
                                      Sub Segments
                                    </th>

                                    <th
                                      scope="col"
                                      className="border-0 font-size-4 font-weight-normal"
                                    ></th>

                                    <th
                                      scope="col"
                                      className="border-0 font-size-4 font-weight-normal"
                                    >
                                      {" "}
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border border-color-2">
                                    <th
                                      scope="col"
                                      className="pl-5 pt-10  border-0 font-size-4  font-weight-bold"
                                    >
                                      To add subsegments click here
                                    </th>
                                    <td></td>
                                    <td>
                                      {" "}
                                      <div className="col-lg-3  mt-5">
                                        <div
                                          className="form-group"
                                          style={{ marginLeft: "-45px" }}
                                        >
                                          <input
                                            type="button"
                                            value={
                                              showAddField
                                                ? "Done"
                                                : "Add Subsegment"
                                            }
                                            className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                            onClick={(e) =>
                                              handleShowAddField(e)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  {showAddField && (
                                    <tr className="border border-color-2">
                                      <td
                                        scope="row"
                                        className="pl-6 border-0 py-7 pr-0"
                                      >
                                        <a className="media min-width-px-235 align-items-center">
                                          <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                            <input
                                              type="text"
                                              className="form-control h-px-48"
                                              id="newValue"
                                              name="newSubsegment"
                                              value={formData.newSubsegment}
                                              onChange={(e) => onChangeField(e)}
                                              placeholder="Enter new Option"
                                            />
                                          </h4>
                                        </a>
                                      </td>
                                      <td></td>
                                      <td className="table-y-middle py-7 min-width-px-100 pr-0">
                                        <div className="col-lg-3  mt-5">
                                          <div
                                            className="form-group"
                                            style={{ marginLeft: "-45px" }}
                                          >
                                            <input
                                              type="button"
                                              value="Add"
                                              className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                              onClick={(e) =>
                                                onAddSubSegment(e)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}

                                  {allDomains[selectedDomain] != null &&
                                    allDomains[selectedDomain][
                                      selectedSegment.label
                                    ] &&
                                    allDomains[selectedDomain][
                                      selectedSegment.label
                                    ].map((subSegment, index) => (
                                      <tr className="border border-color-2">
                                        <td>{subSegment}</td>
                                        <td></td>
                                        <td>
                                          <div className="">
                                            <a
                                              style={{ cursor: "pointer" }}
                                              className="font-size-3 font-weight-bold text-red-2 text-uppercase cursor"
                                              onClick={(e) =>
                                                onDeleteSubsegment(index)
                                              }
                                            >
                                              Delete
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>

                        {/* Table End */}
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
  domains: state.domains.domains,
  loading: state.domains.loading,
});
export default connect(mapStateToProps, { editDomains })(DashboardSettings);
