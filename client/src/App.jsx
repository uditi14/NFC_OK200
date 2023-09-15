import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Reg />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
