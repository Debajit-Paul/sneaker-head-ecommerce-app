import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-fill sm:px-10 px-1">
      <Head>
        <title>Sneaker Head</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className=" sticky top-0 z-10">
        <Navbar />
      </header>
      <main className="main-container relative">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
