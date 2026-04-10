import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paperAPI } from '../api';

function PaperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaperDetail();
  }, [id]);

  const fetchPaperDetail = async () => {
    try {
      setLoading(true);
      const data = await paperAPI.detail(id);
      setPaper(data);
      if (data.status === 'COMPLETED' && data.analysisData) {
        setAnalysisResult(data.analysisData);
      }
      setError(null);
    } catch (err) {
      setError('获取论文详情失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await paperAPI.analyze(id);
      if (response.success) {
        setAnalysisResult(response.data);
        setPaper(prev => ({ ...prev, status: 'COMPLETED' }));
      } else {
        setError(response.message || '分析失败');
      }
    } catch (err) {
      setError('分析失败，请重试');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status || 'PENDING'}`;
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (!paper) {
    return <div className="error">论文不存在</div>;
  }

  return (
    <div className="paper-detail-page">
      <button
        className="btn btn-secondary"
        onClick={() => navigate('/list')}
        style={{ marginBottom: '1rem' }}
      >
        返回列表
      </button>

      <div className="paper-detail">
        <div className="paper-detail-header">
          <h2>{paper.title}</h2>
          <p className="paper-meta">
            作者: {paper.author} | 上传时间: {formatDate(paper.uploadTime)} |
            状态: <span className={getStatusClass(paper.status)}>
              {paper.status === 'PENDING' && '待分析'}
              {paper.status === 'ANALYZING' && '分析中'}
              {paper.status === 'COMPLETED' && '已完成'}
              {paper.status === 'FAILED' && '失败'}
            </span>
          </p>
        </div>

        {paper.abstractText && (
          <div className="paper-section">
            <h3>摘要</h3>
            <p>{paper.abstractText}</p>
          </div>
        )}

        <div className="paper-section">
          <h3>文件信息</h3>
          <p>文件名: {paper.fileName}</p>
          <p>文件大小: {(paper.fileSize / 1024 / 1024).toFixed(2)} MB</p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="action-bar">
          {(paper.status === 'PENDING' || !analysisResult) && (
            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? '分析中...' : '开始分析'}
            </button>
          )}
          {analysisResult && (
            <button
              className="btn btn-secondary"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? '重新分析中...' : '重新分析'}
            </button>
          )}
        </div>

        {analysisResult && (
          <div className="analysis-result">
            <h3>分析结果</h3>

            {analysisResult.summary && (
              <div className="analysis-section">
                <h4>论文摘要</h4>
                <p><strong>英文摘要:</strong> {analysisResult.summary.originalAbstract}</p>
                <p><strong>中文摘要:</strong> {analysisResult.summary.generatedSummary}</p>
              </div>
            )}

            {analysisResult.keywords && (
              <div className="analysis-section">
                <h4>关键词</h4>
                <div className="keywords">
                  {analysisResult.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.keyPoints && (
              <div className="analysis-section">
                <h4>关键要点</h4>
                {analysisResult.keyPoints.map((point, index) => (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <strong>{point.title}:</strong> {point.description}
                  </div>
                ))}
              </div>
            )}

            {analysisResult.qualityMetrics && (
              <div className="analysis-section">
                <h4>质量评估</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span>创新性: {analysisResult.qualityMetrics.novelty}%</span>
                  <span>方法论: {analysisResult.qualityMetrics.methodology}%</span>
                  <span>实验设计: {analysisResult.qualityMetrics.experimentalDesign}%</span>
                  <span>清晰度: {analysisResult.qualityMetrics.clarity}%</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaperDetail;
