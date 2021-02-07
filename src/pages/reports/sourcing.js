import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Router from "next/router";

const sourcing = ({ isAuthenticated, sourcing }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  });
  let sourcingObj = {
    DATE_SIFTED: "",
    SOURCE: "",
    POSITION_TITLE_APPLIED: "",
    CANDIDATES_PROFILE: "",
    DOMAIN: "",
    SEGMENT: "",
    SUB_SEGMENT: "",
    MANNER_OF_INVITE: "",
    DATE_INVITED: "",
  };
  let sourcingName = [
    "DATE SIFTED",
    "SOURCE",
    "POSITION TITLE APPLIED",
    "CANDIDATES PROFILE",
    "DOMAIN",
    "SEGMENT",
    "SUB SEGMENT",
    "MANNER OF INVITE",
    "DATE INVITED",
  ];
  let allColumns = [];
  Object.keys(sourcingObj).map((key, index) => {
    let data = {
      label: sourcingName[index],
      field: key,
      width: 150,
    };
    allColumns.push(data);
  });

  const [datatable, setDatatable] = React.useState({
    columns: allColumns,
    rows: sourcing,
  });

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
        className="dashboard-main-container mt-24 mt-lg-31"
        id="dashboard-body"
      >
        <h5 style={{ color: "#00b074" }}>SOURCING</h5>
        <MDBDataTable
          hover
          data={datatable}
          pagingTop
          searchTop
          scrollX scrollY maxHeight='80vh'
       
          searchBottom={false}
        />
      </div>
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sourcing: state.sheets.sourcing,
});
export default connect(mapStateToProps)(sourcing);
