import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import { connect } from "react-redux";
import { login, loginByGoogle } from "../../store/actions/auth";
import { GoogleLogin } from "react-google-login";
import Link from "next/link";
import Router from "next/router";

const ModalStyled = styled(Modal)`
  /* &.modal {
    z-index: 10050;
  } */
`;

const ModalSignIn = (props) => {
  const { login, loginByGoogle } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [showPass, setShowPass] = useState(true);
  const gContext = useContext(GlobalContext);
  const handleClose = () => {
    gContext.toggleSignInModal();
  };
  const toggelSignUp = () => {
    gContext.toggleSignInModal();
    gContext.toggleSignUpModal();
  };

  const togglePassword = () => {
    setShowPass(!showPass);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
    gContext.toggleSignInModal();
  };
  const responseGoogle = (response) => {
    console.log(response);
    if (response) {
      loginByGoogle(response.profileObj);
      gContext.toggleSignInModal();
    }
  };
  const loginWithGmail = (e) => {
    document.getElementById("googleButton").childNodes[0].click();
  };
  const handleForgotPassword = (e) => {
    Router.push("/forgot-password");
    gContext.toggleSignInModal();
  };
  return (
    <ModalStyled
      {...props}
      size="lg"
      centered
      show={gContext.signInModalVisible}
      onHide={gContext.toggleSignInModal}
    >
      <Modal.Body className="p-0">
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-6">
              <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                <div className="pb-9">
                  <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                    Welcome Back
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Log in to continue your account and explore new jobs.
                  </p>
                </div>
                <div className="border-top border-default-color-2 mt-auto">
                  <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">295</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New jobs posted today
                      </p>
                    </div>
                    <div className="pt-5 px-9">
                      <h3 className="font-size-7 text-white">14</h3>
                      <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                        New companies registered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                {/* <div className="row">
                  {/* <div className="col-4 col-xs-12">
                    <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Log in with LinkedIn
                      </span>
                    </a>
                  </div> */}
                {/* <div className="col-4 col-xs-12" > */}
                {/* <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span
                        className="d-none d-xs-block"
                        onClick={loginWithGmail}
                      >
                        Log in with Google
                      </span>
                    </a>
                  </div>
                  <div style={{display:'none'}} id='googleButton'>
                    <GoogleLogin
                      clientId="264520589114-rgn2vs87ta6jhlsqcbvpkmfgvddkrplc.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      id="googleButton1"
                      cookiePolicy={"single_host_origin"}
                    />
                  </div> */}

                {/* <div className="col-4 col-xs-12">
                    <a
                      href="/#"
                      className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                    >
                      <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                      <span className="d-none d-xs-block">
                        Log in with Facebook
                      </span>
                    </a>
                  </div> */}
                {/* </div>  */}
                {/* <div className="or-devider">
                  <span className="font-size-3 line-height-reset ">Or</span>
                </div> */}
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <label
                      htmlFor="email"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPass ? "password" : "text"}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePassword();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    <label
                      htmlFor="terms-check"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check"
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                        Remember password
                      </span>
                    </label>
                    <a
                      onClick={(e) => handleForgotPassword(e)}
                      className="font-size-3 text-dodger line-height-reset"
                    >
                      Forget Password
                    </a>
                  </div>
                  <div className="form-group mb-8">
                    <button
                      type="submit"
                      className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                    >
                      Log in{" "}
                    </button>
                  </div>
                  {/* <p className="font-size-4 text-center heading-default-color">
                    Don’t have an account?{" "}
                    <a onClick={toggelSignUp} className="text-primary">
                      Create a free account
                    </a>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </ModalStyled>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { login, loginByGoogle })(ModalSignIn);
