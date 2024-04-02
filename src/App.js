import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, changeAlert] = useState({ display: "invisible", type: "", message: "" });
  const showAlert = (type, message) => {
    changeAlert({ display: "visible", type: type, message: message });
    setTimeout(() => {
      changeAlert({ display: "invisible", type: "", message: "" });
    }, 500);
  };
  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
