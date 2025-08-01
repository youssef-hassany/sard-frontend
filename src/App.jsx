import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRouter from "./components/common/AppRouter";

function App() {
  document.dir = localStorage.getItem("language") === "ar" ? "rtl" : "ltr";

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
