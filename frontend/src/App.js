import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PaperUpload from './pages/PaperUpload';
import PaperList from './pages/PaperList';
import PaperDetail from './pages/PaperDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">PaperMind</Link>
          </div>
          <div className="nav-links">
            <Link to="/upload">上传论文</Link>
            <Link to="/list">论文列表</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<PaperUpload />} />
            <Route path="/list" element={<PaperList />} />
            <Route path="/detail/:id" element={<PaperDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>欢迎使用 PaperMind</h1>
      <p>论文解析与智能分析系统</p>
      <div className="home-actions">
        <Link to="/upload" className="btn btn-primary">上传论文</Link>
        <Link to="/list" className="btn btn-secondary">查看论文</Link>
      </div>
    </div>
  );
}

export default App;
