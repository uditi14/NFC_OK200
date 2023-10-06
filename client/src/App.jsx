import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Reg from "./Components/Register/Reg";
import ListCar from "./Components/ListCar/ListCar";
import Gmap from './Components/Gmap/Gmap'
import UserPage from "./Components/GetCars/GetCars";
import CarCard from "./Components/CarCard/CarCard";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Reg />} />{" "}
          <Route path="/list" element={<ListCar/>} />
          <Route path='/map' element={<Gmap/>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/card" element={<CarCard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
