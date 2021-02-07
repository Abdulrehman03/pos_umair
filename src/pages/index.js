import React, { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader/index";
import Hero from "../sections/landing1/Hero";
import Brands from "../sections/landing1/Brands";
import Categories from "../sections/landing1/Categories";
import Content1 from "../sections/landing1/Content1";
import FeaturedJobs from "../sections/landing1/FeaturedJobs";
import Content2 from "../sections/landing1/Content2";
import { connect } from "react-redux";
import Router from "next/router";

const IndexPage = ({ isAuthenticated, loading }) => {
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/dashboard-main");
    }
  });
  return (
    <>
      {loading && <Loader />}
      <PageWrapper
        headerConfig={{
          bgClass: "dynamic-sticky-bg",
        }}
      >
        <Hero />
        {/* <Brands />
        <Categories />
        <Content1 />
        <FeaturedJobs />
        <Content2 /> */}
      </PageWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps)(IndexPage);
