import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import PaperUpload from './pages/PaperUpload';
import PaperList from './pages/PaperList';
import PaperDetail from './pages/PaperDetail';
import AuthPage from './pages/AuthPage';
import './App.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  // 监听 localStorage 变化（其他页面修改了登录状态时同步更新）
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        const token = localStorage.getItem('token');
        const savedUsername = localStorage.getItem('username');
        if (token && savedUsername) {
          setIsLoggedIn(true);
          setUsername(savedUsername);
        } else {
          setIsLoggedIn(false);
          setUsername('');
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} setUsername={setUsername} />
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* 顶部栏 - 完整横行 */}
      <header className="topbar">
        <div className="topbar-brand">PaperMind</div>
        <div className="topbar-right">
          <span className="username">{username}</span>
          <button onClick={handleLogout} className="logout-btn">退出</button>
        </div>
      </header>

      {/* 下方内容区 */}
      <div className="content-area">
        {/* 左侧导航栏 */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/upload" className="nav-item">
              <span className="nav-icon">📄</span>
              <span>上传论文</span>
            </Link>
            <Link to="/list" className="nav-item">
              <span className="nav-icon">🤖</span>
              <span>论文解析</span>
            </Link>
            <Link to="/tasks" className="nav-item">
              <span className="nav-icon">⏳</span>
              <span>任务中心</span>
            </Link>
            <Link to="/favorites" className="nav-item">
              <span className="nav-icon">⭐</span>
              <span>收藏/标签</span>
            </Link>
            <Link to="/settings" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span>设置</span>
            </Link>
          </nav>
        </aside>

        {/* 右侧工作区 */}
        <main className="workspace">
          <Routes>
            <Route path="/upload" element={<PaperUpload />} />
            <Route path="/list" element={<PaperList />} />
            <Route path="/detail/:id" element={<PaperDetail />} />
            <Route path="/" element={<Navigate to="/upload" />} />
            <Route path="/tasks" element={<div className="page-placeholder">任务中心 - 建设中</div>} />
            <Route path="/favorites" element={<div className="page-placeholder">收藏/标签 - 建设中</div>} />
            <Route path="/settings" element={<div className="page-placeholder">设置 - 建设中</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
