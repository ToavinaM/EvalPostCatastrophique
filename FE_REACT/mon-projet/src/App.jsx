import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import MainLayout from "./components/MainLayout";
import Map from "./components/Map/Map";
import Upload from "./components/Upload/Upload";
import 'antd/dist/reset.css';
import './index.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cartographie" element={<MainLayout header={true} fullScreen = {true}><Map /></MainLayout>} />
        <Route path="/upload" element={<MainLayout header={true} fullScreen={true}><Upload /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
