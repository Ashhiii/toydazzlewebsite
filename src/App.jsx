import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dotPulse } from "ldrs";
import { tailspin } from "ldrs";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ring } from "ldrs";

const App = () => {
  dotPulse.register();
  tailspin.register();
  ring.register();

  const location = useLocation();

  // Define paths where you DON'T want the Header/Footer
  const hideHeaderFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!hideHeaderFooter && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={true}
        theme="light"
      />
    </>
  );
};

export default App;
