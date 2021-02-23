import React, { useContext, useState } from "react";
import Link from "next/link";
import { Collapse } from "react-bootstrap";
import GlobalContext from "../../context/GlobalContext";
import imgL from "../../assets/image/logo-main-black.png";
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

const Sidebar = ({ user }) => {
  const gContext = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const router = useRouter()
  console.log(router.pathname)
  return (
    <>
      <Collapse in={gContext.showSidebarDashboard}>
        <div className="dashboard-sidebar-wrapper pt-11" id="sidebar">
          <div className="brand-logo px-11">
            <Link href="/">
              <a>
                <img src={imgL} alt="" />
              </a>
            </Link>
          </div>
          <div className="my-15 px-11">
            {/* <Link href="/#">
              <a className="btn btn-primary btn-xl w-100 text-uppercase">
                <span className="mr-5 d-inline-block">+</span>Post a new job
              </a>
            </Link> */}
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar">
            <li className="" >
              <Link href="/dashboard-main">
                <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/dashboard-main' && 'active'}`}>
                  <i className="icon icon-layout-11 mr-7"></i>Dashboard
                </a>
              </Link>
            </li>
            {
              user && user.email == 'admin@mail.com' && (
                <li className="" >
                  <Link href="/reports/users">
                    <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/users' && 'active'}`}>
                      <i className="icon icon-layout-11 mr-7"></i>Users
                  </a>
                  </Link>
                </li>
              )
            }

            {/* <li className="">
              <Link href="/admin-dropdowns">
                <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/admin-dropdowns' && 'active'}`} >
                  <i className="fas fa-briefcase mr-7"></i>Dropdowns
                </a>
              </Link>
            </li>
            <li className="">
              <Link href="/admin-domains">
                <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/admin-domains' && 'active'} `}>
                  <i className="fas fa-briefcase mr-7"></i>Domains
                </a>
              </Link>
            </li> */}
            <li
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              style={{ cursor: "pointer" }}
            >
              <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center justify-content-between `}>
                Reports
                {open ? (
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-down-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                ) : (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-caret-right-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  )}
              </a>
            </li>
            <Collapse in={open}>
              <div id="example-collapse-text">
                {
                  user && user.email == 'admin@mail.com' && (
                    <li className="">
                      <Link href="/reports/product">
                        <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/product' && 'active'}`}>
                          <i className="fas fa-user mr-7"></i>Product{" "}
                        </a>
                      </Link>
                    </li>
                  )
                }


                <li className="">
                  <Link href="/reports/product_sale">
                    <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/product_sale' && 'active'}`}>
                      <i className="fas fa-user mr-7"></i>Product Sale{" "}
                    </a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/reports/sale">
                    <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/sale' && 'active'}`}>
                      <i className="fas fa-user mr-7"></i>Sales{" "}
                    </a>
                  </Link>
                </li>


                {
                  user && user.email == 'admin@mail.com' && (
                    <li className="">
                      <Link href="/reports/profit">
                        <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/profit' && 'active'}`}>
                          <i className="fas fa-user mr-7"></i>Profits{" "}
                        </a>
                      </Link>
                    </li>
                  )
                }



                <li className="">
                  <Link href="/reports/customer">
                    <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/reports/customer' && 'active'}`}>
                      <i className="fas fa-user mr-7"></i>Customers{" "}
                    </a>
                  </Link>
                </li>



              </div>
            </Collapse>
            <li
              onClick={() => setOpenForm(!openForm)}
              aria-controls="example-collapse-text"
              aria-expanded={openForm}
              style={{ cursor: "pointer" }}
            >
              <a className={`px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center justify-content-between `}>
                Forms
                {openForm ? (
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-caret-down-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                ) : (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-caret-right-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                  )}
              </a>
            </li>
            <Collapse in={openForm}>
              <div id="example-collapse-text">
                {
                  user && user.email == 'admin@mail.com' && (
                    <li className="">
                      <Link href="/forms/product">
                        <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/forms/product' && 'active'}`}>
                          <i className="fas fa-user mr-7"></i>Product {" "}
                        </a>
                      </Link>
                    </li>
                  )
                }

                <li className="">
                  <Link href="/forms/sale">
                    <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/forms/sale' && 'active'}`}>
                      <i className="fas fa-user mr-7"></i>Sale {" "}
                    </a>
                  </Link>
                </li>
                <li className="">
                  <Link href="/forms/customer">
                    <a className={`px-10 ml-7 py-1 my-5 font-size-4 font-weight-semibold flex-y-center ${router.pathname == '/forms/customer' && 'active'}`}>
                      <i className="fas fa-user mr-7"></i>Customer {" "}
                    </a>
                  </Link>
                </li>

              </div>
            </Collapse>
          </ul>
        </div>
      </Collapse>
      <a
        href="/#"
        className="sidebar-mobile-button"
        onClick={(e) => {
          e.preventDefault();
          gContext.toggleSidebarDashboard();
        }}
      >
        <i className="icon icon-sidebar-2"></i>
      </a>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Sidebar);
