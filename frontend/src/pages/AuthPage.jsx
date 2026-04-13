import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../api';

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await userAPI.login({
          username: formData.username,
          password: formData.password
        });
        // 保存登录信息到 localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        // 跳转到上传页面
        navigate('/upload');
      } else {
        await userAPI.register({
          username: formData.username,
          password: formData.password
        });
        // 注册成功后切换到登录
        setIsLogin(true);
        setError('');
        alert('注册成功，请登录');
      }
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? '登录失败' : '注册失败'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>PaperMind</h1>
        <h2>{isLogin ? '登录' : '注册'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="请输入用户名"
            />
          </div>

          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="请输入密码"
            />
          </div>

          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button onClick={toggleMode} className="link-btn">
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
