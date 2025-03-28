import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import MainLayout from "./MainLayout";
import Map from "./components/Map/Map";
import Upload from "./components/Upload/Upload";
import 'antd/dist/reset.css';
import './index.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cartographie" element={<MainLayout header={false} fullScreen = {true}><Map /></MainLayout>} />
        <Route path="/upload" element={<MainLayout><Upload /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
