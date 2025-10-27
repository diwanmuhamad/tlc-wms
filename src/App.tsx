import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Inbound from "./pages/Inbound";

export default function App() {
  return (
    <>
      <Navbar />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/add-inbound" element={<Inbound />} />
        </Routes>
      </Sidebar>
    </>
  );
}
