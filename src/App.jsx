import "./App.css";
import AppRouter from "./components/common/AppRouter";

function App() {
  document.dir =
    !localStorage.getItem("language") ||
    localStorage.getItem("language") === "ar"
      ? "rtl"
      : "ltr";

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
