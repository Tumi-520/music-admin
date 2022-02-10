import React,{Fragment} from "react";
import Head from "./head";
import Footer from "./footer";
import Content from "./content";
const Home = () => {
  return (
    <Fragment>      
      <Head />
      <Content />
      <Footer/>
    </Fragment>
  );
};

export default Home;
