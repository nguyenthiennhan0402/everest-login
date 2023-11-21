import React, { useState } from "react";
import { Login } from "./Components/Login/login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
