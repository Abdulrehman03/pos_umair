import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";

const finance = ({selectedFinance}) => {
  const [formData, setFormData] = useState({
    STANDARD_PROJECTED_REVENUE: "",
    CLIENT: "",
    CAREER_LEVEL: "",
    OFFERED_SALARY: "",
    ALLOWANCE: "",
    TOTAL_BILLABLE_AMOUNT: "",
    RATE: "",
    PLACEMENT_FEE: "",
    ONBOARDING_DATE: "",
    INVOICE_NUMBER: "",
    REMARKS_FROM_RECRUITER: "",
  });
  useEffect(() => {
    if (selectedFinance) {
      console.log(selectedFinance);
      console.log(formData);
      setFormData(selectedFinance);
    }
  }, [selectedFinance]);

  return (
    <PageWrapper
      headerConfig={{
        button: "profile",
        isFluid: true,
        bgClass: "bg-default",
        reveal: false,
      }}
    >
      <div className="dashboard-main-container mt-18 " id="dashboard-body">
        <h5 style={{ color: "#00b074",marginBottom:'20px' }}>FINANCE REFERENCE</h5>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Standard Projected Revenue
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.STANDARD_PROJECTED_REVENUE}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Client
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.CLIENT}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Carrer Level
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={formData.CAREER_LEVEL}
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Offered Salary
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={formData.OFFERED_SALARY}
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Allowance
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.ALLOWANCE}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Total Billable Ammount
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={formData.TOTAL_BILLABLE_AMOUNT}
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Rate
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.RATE}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold "
                    id="inputGroup-sizing-sm"
                  >
                    Placement Fee
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.PLACEMENT_FEE}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Onboarding Date
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={formData.ONBOARDING_DATE}
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Invoice Number
                  </span>
                </div>
                <input
                  type="text"
                  disabled
                  value={formData.INVOICE_NUMBER}
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-xl-1 mb-9">
          <div className="col-lg-6">
            <div className="form-group">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text modal-text-bold"
                    id="inputGroup-sizing-sm"
                  >
                    Remarks From Recruiter
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.REMARKS_FROM_RECRUITER}
                  disabled
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
const mapStateToProps = (state) => ({
  selectedFinance: state.finance.selectedFinance,
});

export default connect(mapStateToProps)(finance);
