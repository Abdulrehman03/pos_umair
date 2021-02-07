import { useEffect } from "react";
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";
import { Provider } from "react-redux";
import storeData from "../store/store";

import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";

import "../assets/fonts/icon-font/fonts/avasta.ttf";
import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";
import "../assets/custom_css/searchable.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<script src="https://kit.fontawesome.com/a076d05399.js"></script>;

//LOader
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { getProducts } from "../store/actions/product";
import { getCustomers } from "../store/actions/customer";
const { store } = storeData;

const MyApp = ({ Component, pageProps, router }) => {
  useEffect(() => {
    store.dispatch(getProducts());
    store.dispatch(getCustomers());

  });

  if (router.pathname.match(/404/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "bare" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/activate-account/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "bare" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/dashboard/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/forms/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/reports/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/profile/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }
  if (router.pathname.match(/admin/)) {
    return (
      <Provider store={store}>
        <GlobalProvider>
          <Layout pageContext={{ layout: "dashboard" }}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </Layout>
        </GlobalProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <GlobalProvider>
        <Layout pageContext={{}}>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
        </Layout>
      </GlobalProvider>
    </Provider>
  );
};

export default MyApp;
