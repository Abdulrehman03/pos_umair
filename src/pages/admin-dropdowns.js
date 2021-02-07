import React, { useEffect, useState } from "react";

import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import Link from "next/link";
import { connect } from "react-redux";
import Head from "next/head";
import { editDropdown } from "../store/actions/dropdowns";
import Badge from "../components/Core/Badge";
import Switch from "../components/Core/Switch";
import Loader from "../components/Loader";
import Router from "next/router";
import SearchReact from 'react-select'

const DashboardSettings = ({
  editDropdown,
  dropdowns,
  loading,
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
      cursor: "pointer",
    },
    badge2: {
      width: "80px",
      cursor: "pointer",
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

  let sourceOptions = [];
  let educationalAttaintmentOptions = [];
  const [dropdownOptions, setDropdownOptions] = useState();
  const [dropDrownObjectAdd, setDropDrownObjectAdd] = useState();
  const [showAddField, setShowAddField] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState({
    label:"REMARKS_FOR_FINANCE",
    value:"remarks_for_finance",

  });


  const [formData, setFormData] = useState({
    newValue: "", 
    objectOptionValue: "",
    objectOptionKey: "initial_stages",
    activeSwitch: true,
    sprKey: "TECHNOLOGY",
    sprCode: "",
    sprValue: "",
  });

  useEffect(() => {
    if (dropdowns) {
      setDropdownOptions(dropdowns[0]);
    }
  }, [dropdowns]);
  console.log(dropdownOptions);

  let source = [];

  if (dropdownOptions) {
    //Setting Source dropdown values
    sourceOptions = dropdownOptions.source;
    educationalAttaintmentOptions = dropdownOptions.educational_attaintment;
    dropdownOptions.source.map((item) => {
      let obj = {
        value: item,
        label: item,
      };
      source.push(obj);
    });
    // End
  }

  const onChange = (e) => {
    // console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSelectDropdown = (e) => {
    setDropDrownObjectAdd(false);
    setShowAddField(false);
    // console.log(dropdownOptions[selectedDropdown.value]);
console.log(e)
    setSelectedDropdown(e);
  };

  const onAddOption = (e) => {
    if (formData.newValue != "") {
      dropdownOptions[selectedDropdown.value].unshift(formData.newValue);
      // console.log(dropdownOptions[selectedDropdown.value]);
      let data = {
        [selectedDropdown.value]: dropdownOptions[selectedDropdown.value],
      };

      editDropdown(data);
      formData.newValue = "";
      setFormData({ ...formData, newValue: "" });
      setShowAddField(false);
    }
  };
  const onAddObjectOption = (e) => {
    if (selectedDropdown.value == "spr") {
      let obj = {
        code: formData.sprCode,
        value: formData.sprValue,
      };
      dropdownOptions.spr[0][formData.sprKey].unshift(obj);
      let data = {
        spr: dropdownOptions.spr,
      };
      formData.sprCode = "";
      formData.sprValue = "";
      setDropDrownObjectAdd(false);
      editDropdown(data);
    } else {
      let obj = {
        item: formData.objectOptionValue,
        active: formData.activeSwitch,
      };
      dropdownOptions.remarks_for_finance[formData.objectOptionKey].unshift(
        obj
      );
      let data = {
        remarks_for_finance: dropdownOptions.remarks_for_finance,
      };
      formData.objectOptionValue = "";
      setDropDrownObjectAdd(false);
      editDropdown(data);
    }
  };
  const handleShowAddField = () => {
    setShowAddField(!showAddField);
  };
  const handleShowObjectAddField = () => {
    setDropDrownObjectAdd(!dropDrownObjectAdd);
  };
  const handleSwitch = (e) => {
    let { activeSwitch } = formData;
    setFormData({ ...formData, activeSwitch: !activeSwitch });
  };

  const handleDeleteObjectItem = (key, item, index) => {
    if (selectedDropdown.value == "remarks_for_finance") {
      dropdownOptions.remarks_for_finance[key].splice(index, 1);
      let data = {
        remarks_for_finance: dropdownOptions.remarks_for_finance,
      };
      editDropdown(data);
    }
    if (selectedDropdown.value == "spr") {
      dropdownOptions.spr[0][key].splice(index, 1);
      let data = {
        spr: dropdownOptions.spr,
      };
      // console.log(data);
      editDropdown(data, "delete");
    }
  };
  const onDelete = (item, index) => {
    console.log(item);
    dropdownOptions[selectedDropdown.value].splice(index, 1);
    // console.log(dropdownOptions[selectedDropdown.value]);
    setDropdownOptions(dropdownOptions);
    let data = {
      [selectedDropdown.value]: dropdownOptions[selectedDropdown.value],
    };
    editDropdown(data, "delete");
  };
  const handleChangeActive = (item, type, index) => {
    let obj = {
      item: item.item,
      active: !item.active,
    };
    console.log(obj);
    dropdownOptions.remarks_for_finance[type][index] = obj;
    setDropdownOptions(dropdownOptions);
    let data = {
      [selectedDropdown.value]: dropdownOptions[selectedDropdown.value],
    };
    editDropdown(data);
  };
  let searchableOptions = [];
  if (dropdownOptions) {
    Object.keys(dropdownOptions).map((key) => {
      if (key != "_id" && key != "__v") {
        let data = { label: key.toUpperCase(), value: key };
        searchableOptions.push(data)
      }
    });
  }

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
                    Add Dropdowns
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                    <form action="/">
                      <fieldset>
                        {/* Dropdown All start */}

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-8 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="select3"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Dropdowns{" "}
                              </label>
                              <form className='mt-5' onSubmit={(e) => e.preventDefault()}>
                                <SearchReact
                                
                                  options={searchableOptions}
                                  value={selectedDropdown}
                                  onChange={(e) => onSelectDropdown(e)}
                                />
                              </form>
                              {/* <select
                                onChange={(e) => onSelectDropdown(e)}
                                id="dropdowns"
                                className="form-control p-5 arrow-3  w-100 font-size-4 d-flex align-items-center w-100"
                              >
                                {dropdownOptions &&
                                  Object.keys(dropdownOptions).map((key) => {
                                    if (key != "_id" && key != "__v") {
                                      return (
                                        <option value={key} id="option">
                                          {key.toUpperCase()}
                                          {""}
                                        </option>
                                      );
                                    }
                                  })}
                              </select> */}
                            </div>
                          </div>
                          <div className="col-lg-4 mb-xl-0 mt-8 mb-7">
                            <div
                              style={{ fontSize: "24px" }}
                              className="form-group position-relative"
                            >
                              {showAddField || dropDrownObjectAdd ? (
                                <div className="col-lg-3 mt-5">
                                  <div className="form-group">
                                    <input
                                      type="button"
                                      value="Done"
                                      className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                      onClick={
                                        selectedDropdown.value ==
                                          "remarks_for_finance" ||
                                        selectedDropdown.value == "spr"
                                          ? handleShowObjectAddField
                                          : handleShowAddField
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="col-lg-3 mt-5 ">
                                  <div className="form-group">
                                    <input
                                      type="button"
                                      value="Add"
                                      className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                      onClick={
                                        selectedDropdown.value ==
                                          "remarks_for_finance" ||
                                        selectedDropdown.value == "spr"
                                          ? handleShowObjectAddField
                                          : handleShowAddField
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Add normal dropdwon div start */}
                        {showAddField && (
                          <div className="row mb-xl-1 mb-9">
                            <div className="col-lg-8">
                              <div className="form-group">
                                <div class="input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="newValue"
                                    name="newValue"
                                    value={formData.newValue}
                                    onChange={(e) => onChange(e)}
                                    placeholder="Enter new Option"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 pl-9">
                              <div className="form-group">
                                <div class="input-group input-group-sm">
                                  <input
                                    type="button"
                                    value="Add"
                                    className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                    onClick={(e) => onAddOption(e)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Add normal dropdwon div end */}

                        {/* Add object form dropdown start */}
                        {dropDrownObjectAdd &&
                        selectedDropdown.value == "remarks_for_finance" ? (
                          <div className="row mb-xl-1 mb-9">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <div class="input-group input-group">
                                  <select
                                    name="objectOptionKey"
                                    value={formData.objectOptionKey}
                                    onChange={(e) => onChange(e)}
                                    id="dropdowns"
                                    className="form-control p-5 arrow-3  w-100 font-size-4 d-flex align-items-center w-100"
                                  >
                                    {dropdownOptions &&
                                      Object.keys(
                                        dropdownOptions.remarks_for_finance
                                      ).map((key) => (
                                        <option value={key}>
                                          {key.toUpperCase()}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 pl-9">
                              <div className="form-group">
                                <div class="input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="objectOptionValue"
                                    name="objectOptionValue"
                                    value={formData.objectOptionValue}
                                    onChange={(e) => onChange(e)}
                                    placeholder="Enter new Option"
                                  />
                                  &nbsp;
                                  <Badge
                                    style={classes.badge2}
                                    onClick={(e) => handleSwitch(e)}
                                    bg={
                                      formData.activeSwitch
                                        ? "primary"
                                        : "#FC3F3F"
                                    }
                                  >
                                    {formData.activeSwitch
                                      ? "Active"
                                      : "In Active"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 pl-9">
                              <div className="form-group">
                                <div class="input-group input-group-sm">
                                  <div className="form-group">
                                    <div class="input-group input-group-sm">
                                      <input
                                        type="button"
                                        value="Add"
                                        className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => onAddObjectOption(e)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          dropDrownObjectAdd &&
                          selectedDropdown.value == "spr" && (
                            <div className="row mb-xl-1 mb-9">
                              <div className="col-lg-3">
                                <div className="form-group">
                                  <div class="input-group input-group">
                                    <select
                                      name="sprKey"
                                      value={formData.sprKey}
                                      onChange={(e) => onChange(e)}
                                      id="dropdowns"
                                      className="form-control p-5 arrow-3  w-100 font-size-4 d-flex align-items-center w-100"
                                    >
                                      {dropdownOptions &&
                                        Object.keys(
                                          dropdownOptions.spr[0]
                                        ).map((key) => (
                                          <option value={key}>
                                            {key.toUpperCase()}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5 pl-9">
                                <div className="form-group">
                                  <div class="input-group input-group-sm">
                                    <input
                                      type="text"
                                      className="form-control h-px-48"
                                      id="objectOptionValue"
                                      name="sprCode"
                                      value={formData.sprCode}
                                      onChange={(e) => onChange(e)}
                                      placeholder="Enter new Option"
                                    />
                                    &nbsp;
                                    <input
                                      type="number"
                                      className="form-control h-px-48"
                                      id="objectOptionValue"
                                      name="sprValue"
                                      value={formData.sprValue}
                                      onChange={(e) => onChange(e)}
                                      placeholder="Enter new Option"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-4 pl-9">
                                <div className="form-group">
                                  <div class="input-group input-group-sm">
                                    <div className="form-group">
                                      <div class="input-group input-group-sm">
                                        <input
                                          type="button"
                                          value="Add"
                                          className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) => onAddObjectOption(e)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}

                        {/* Add object form dropdown start */}

                        {/* Dropdown All End */}

                        {selectedDropdown.value && (
                          <div className="table-responsive mt-10">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="pl-0  border-0 font-size-4 font-weight-normal"
                                  >
                                    Options
                                  </th>

                                  <th
                                    scope="col"
                                    className="border-0 font-size-4 font-weight-normal"
                                  >
                                    {selectedDropdown.value ==
                                      "remarks_for_finance" && "Status"}
                                    {selectedDropdown.value == "spr" && "Value"}
                                  </th>

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
                                {dropdownOptions &&
                                Array.isArray(
                                  dropdownOptions[selectedDropdown.value]
                                ) != false &&
                                dropdownOptions[selectedDropdown.value][0][0]
                                  ? // Normal dropdown Items starts
                                    dropdownOptions[selectedDropdown.value].map(
                                      (item, index) => (
                                        <tr className="border border-color-2">
                                          <th
                                            scope="row"
                                            className="pl-6 border-0 py-7 pr-0"
                                          >
                                            <a className="media min-width-px-235 align-items-center">
                                              <h4 className="font-size-4 mb-0 font-weight-normal text-black-2">
                                                {item.toUpperCase()}
                                              </h4>
                                            </a>
                                          </th>
                                          <td>
                                            <pre></pre>
                                          </td>
                                          <td className="table-y-middle py-7 min-width-px-100 pr-0">
                                            <div className="">
                                              <a
                                                style={{ cursor: "pointer" }}
                                                onClick={(e) =>
                                                  onDelete(item, index)
                                                }
                                                className="font-size-3 font-weight-bold text-red-2 text-uppercase cursor"
                                              >
                                                Delete
                                              </a>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    )
                                  : // Normal dropdown Items Ends

                                  // Dropdown options with objects start
                                  dropdownOptions &&
                                    selectedDropdown.value == "remarks_for_finance"
                                  ? Object.keys(
                                      dropdownOptions.remarks_for_finance
                                    ).map((x) => {
                                      return dropdownOptions.remarks_for_finance[
                                        x
                                      ].map((item, index) => (
                                        <>
                                          {index == 0 && (
                                            <>
                                              <label
                                                htmlFor="select3"
                                                className="d-block text-black-2 font-size-4 font-weight-semibold mt-5"
                                              >
                                                {x.toUpperCase()}
                                              </label>
                                            </>
                                          )}

                                          <tr className="border border-color-2">
                                            <td
                                              scope="row"
                                              className="pl-6 border-0 py-7 pr-0"
                                            >
                                              <a className="media min-width-px-235 align-items-center">
                                                <h4 className="font-size-4 mb-0 font-weight-normal text-black-2">
                                                  {item.item} &nbsp;
                                                </h4>
                                              </a>
                                            </td>

                                            <Badge
                                              style={classes.badge}
                                              onClick={(e) =>
                                                handleChangeActive(
                                                  item,
                                                  x,
                                                  index
                                                )
                                              }
                                              bg={
                                                item.active
                                                  ? "primary"
                                                  : "#FC3F3F"
                                              }
                                            >
                                              {item.active
                                                ? "Active"
                                                : "In Active"}
                                            </Badge>

                                            <td className="table-y-middle py-7 min-width-px-100 pr-0">
                                              <div className="">
                                                <a
                                                  style={{ cursor: "pointer" }}
                                                  className="font-size-3 font-weight-bold text-red-2 text-uppercase cursor"
                                                  onClick={(e) =>
                                                    handleDeleteObjectItem(
                                                      x,
                                                      item,
                                                      index
                                                    )
                                                  }
                                                >
                                                  Delete
                                                </a>
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                        // Dropdown options with objects Ends
                                      ));
                                    })
                                  : dropdownOptions &&
                                    Object.keys(dropdownOptions.spr[0]).map(
                                      (x) => {
                                        return dropdownOptions.spr[0][x].map(
                                          (item, index) => (
                                            <>
                                              {index == 0 && (
                                                <>
                                                  <label
                                                    htmlFor="select3"
                                                    className="d-block text-black-2 font-size-4 font-weight-semibold mt-5"
                                                  >
                                                    {x.toUpperCase()}
                                                  </label>
                                                </>
                                              )}

                                              <tr className="border border-color-2">
                                                <td
                                                  scope="row"
                                                  className="pl-6 border-0 py-7 pr-0"
                                                >
                                                  <a className="media min-width-px-235 align-items-center">
                                                    <h4 className="font-size-4 mb-0 font-weight-normal text-black-2">
                                                      {item.code} &nbsp;
                                                    </h4>
                                                  </a>
                                                </td>
                                                <td
                                                  scope="row"
                                                  className="pl-6 border-0 py-7 pr-0"
                                                >
                                                  <a className="media min-width-px-235 align-items-center">
                                                    <h4 className="font-size-4 mb-0 font-weight-normal text-black-2">
                                                      {item.value} &nbsp;
                                                    </h4>
                                                  </a>
                                                </td>

                                                <td className="table-y-middle py-7 min-width-px-100 pr-0">
                                                  <div className="">
                                                    <a
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      className="font-size-3 font-weight-bold text-red-2 text-uppercase cursor"
                                                      onClick={(e) =>
                                                        handleDeleteObjectItem(
                                                          x,
                                                          item,
                                                          index
                                                        )
                                                      }
                                                    >
                                                      Delete
                                                    </a>
                                                  </div>
                                                </td>
                                              </tr>
                                            </>
                                            // Dropdown options with objects Ends
                                          )
                                        );
                                      }
                                    )}
                              </tbody>
                            </table>
                          </div>
                        )}
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
  dropdowns: state.dropdowns.dropdowns,
  loading: state.dropdowns.loading,
});
export default connect(mapStateToProps, { editDropdown })(DashboardSettings);
