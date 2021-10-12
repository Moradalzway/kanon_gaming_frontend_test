import Header from "./components/layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import { BrowserRouter } from "react-router-dom";
import MasterPage from "./components/MasterPage";
function App() {
  return (
    <div className="App container" style={{ margin: "auto" }}>
      <BrowserRouter>
        <Header /> <MasterPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
