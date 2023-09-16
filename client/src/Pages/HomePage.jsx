import React from "react";
import "../App.css";
import Home from "../Components/Home";
import Process from "../Components/Process";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar/Navbar";

function HomePage() {
    return (
      <div className="App">
          <Navbar/>
          <Home />
          <Process />
          <Footer />
      </div>
    );
  }
  
  export default HomePage;