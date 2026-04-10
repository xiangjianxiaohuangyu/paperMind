import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperAPI } from '../api';

function PaperList() {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      const data = await paperAPI.list();
      setPapers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('获取论文列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (paperId) => {
    navigate(`/detail/${paperId}`);
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status || 'PENDING'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="paper-list">
      <h2 className="page-title">论文列表</h2>

      {error && <div className="error">{error}</div>}

      {papers.length === 0 ? (
        <div className="loading">暂无论文，请先上传</div>
      ) : (
        <div className="paper-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>标题</th>
                <th>作者</th>
                <th>上传时间</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr
                  key={paper.id}
                  onClick={() => handleRowClick(paper.id)}
                >
                  <td>{paper.id}</td>
                  <td>{paper.title}</td>
                  <td>{paper.author}</td>
                  <td>{formatDate(paper.uploadTime)}</td>
                  <td>
                    <span className={getStatusClass(paper.status)}>
                      {paper.status === 'PENDING' && '待分析'}
                      {paper.status === 'ANALYZING' && '分析中'}
                      {paper.status === 'COMPLETED' && '已完成'}
                      {paper.status === 'FAILED' && '失败'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaperList;
