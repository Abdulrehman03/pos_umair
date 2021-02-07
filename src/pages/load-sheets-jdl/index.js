import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  uploadSheet,
  uploadLoadedSheetJDL,
  uploadJdlSheet,
} from "../../store/actions/sheets";
import Loader from "../../components/Loader/index";
import Router from "next/router";
import { toast } from "react-toastify";
import sheetIcon from "../../assets/image/sheetImage.png";
import cloud from "../../assets/image/cloud.png";

const LoadSheets = ({
  loading,
  isAuthenticated,
  uploadSheet,
  uploadedFile,

  uploadJdlSheet,
  uploadLoadedSheetJDL,
}) => {
  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
    }
  });

  const classes = {
    sheetIcon: {
      width: "50%",
      cursor: "pointer",
    },
    cloudIcon: {
      width: "60%",
      cursor: "pointer",
    },
  };

  const [showSheet, setShowSheet] = useState(false);
  const [showExcel, setShowExcel] = useState(false);
  const [file, setFile] = useState();

  const [uploadedSheet, setUploadedSheet] = useState({
    fileName: "",
    sheetName: "Client Profile and Rates",
  });
  useEffect(() => {
    if (uploadedFile) {
      console.log(uploadedFile);
      setUploadedSheet({ ...uploadedSheet, fileName: uploadedFile.fileName });
    }
  }, [uploadedFile]);
  console.log(uploadedSheet);
  const [selectedSheet, setSelectedSheet] = useState({
    sheetId: "",
    sheetName: "Client Profile and Rates",
  });
  const onChange = (e) => {
    setSelectedSheet({ ...selectedSheet, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setUploadedSheet({ ...uploadSheet, sheetName: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      sheetId: selectedSheet.sheetId,
    };
    uploadJdlSheet(data);
  };
  const onUploadSheet = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(file)
    // if (e.target.files) {

    //   uploadSheet(e.target.files[0]);
    // }
  };
  const onSubmitUploadedFile = async () => {
    if(file){
      await uploadSheet(file);  
    }
    let data = {
      name: uploadedFile ? uploadedFile.fileName : uploadedSheet.fileName,
    };
    console.log(file);
    if (file) {
      uploadLoadedSheetJDL(data);
    } else {
      toast.error("Add File First!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const handleOpenSheetDiv = () => {
    setShowExcel(false);
    setShowSheet(!showSheet);
    console.log("Sheet");
  };
  const handleOpenExcelDiv = () => {
    setShowSheet(false);
    setShowExcel(!showExcel);
    console.log("Excel");
  };
  return (
    <>
      <div className="container">
        <div className="mb-15 mt-10 mb-lg-23">
          <div className="row">
            <div className="col-xxxl-9 px-lg-13 px-6">
              <h5 className="font-size-6 font-weight-semibold mb-11">
                <i class="fa fa-table"></i> Connect Sheets JDL
              </h5>
              <div className="row contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                <div className="col-sm-12 col-md-6">
                  <label
                    htmlFor="namedash"
                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                  >
                    Click here to Connect Google Sheet
                  </label>
                  <form
                    style={{ borderRight: "1px solid #cecece" }}
                    onSubmit={(e) => onSubmit(e)}
                  >
                    <img
                      style={classes.sheetIcon}
                      src={sheetIcon}
                      onClick={handleOpenSheetDiv}
                    />
                    {showSheet && (
                      <fieldset className="ml-10 mr-10">
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Sheet Id
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="sheetId"
                                name="sheetId"
                                placeholder="Enter Sheet ID"
                                required
                                value={selectedSheet.sheetId}
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-6">
                            <div className="col-lg-3 mt-5">
                              <div className="form-group">
                                <input
                                  type="button"
                                  value="Connect"
                                  className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                  type="submit"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    )}
                  </form>
                </div>
                <div className="col-sm-12 col-md-6">
                  <label
                    htmlFor="namedash"
                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                  >
                    Click here to Upload Excel File
                  </label>
                  <form>
                    <img
                      style={classes.cloudIcon}
                      src={cloud}
                      onClick={handleOpenExcelDiv}
                    />
                    {showExcel && (
                      <fieldset className="ml-20">
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Upload File
                              </label>
                              <input
                                type="file"
                                id="sheetFile"
                                name="sheetId"
                                accept=".xlsx, .xls, .csv"
                                required
                                onChange={(e) => onUploadSheet(e)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-6">
                            <div className="col-lg-3 mt-5">
                              <div className="form-group">
                                <input
                                  type="button"
                                  value="Upload"
                                  className="btn btn-green btn-h-40 text-white min-width-px-110 rounded-5 text-uppercase"
                                  onClick={(e) => onSubmitUploadedFile(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {loading == true && <Loader />} */}
    </>
  );
};
const mapStateToProps = (state) => ({
  loading: state.sheets.loading,
  uploadedFile: state.sheets.uploadedFile,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  uploadSheet,
  uploadJdlSheet,
  uploadLoadedSheetJDL,
})(LoadSheets);
