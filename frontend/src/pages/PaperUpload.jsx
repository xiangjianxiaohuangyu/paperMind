import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperAPI } from '../api';

function PaperUpload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstractText: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('请上传 PDF 文件');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.file) {
      setError('请填写必填项');
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('author', formData.author);
    uploadData.append('abstractText', formData.abstractText);
    uploadData.append('file', formData.file);

    try {
      const response = await paperAPI.upload(uploadData);
      if (response.success) {
        setMessage('论文上传成功！');
        setTimeout(() => {
          navigate('/list');
        }, 1500);
      } else {
        setError(response.message || '上传失败');
      }
    } catch (err) {
      setError(err.message || '上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="paper-upload">
      <h2 className="page-title">上传论文</h2>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>论文标题 *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="请输入论文标题"
            required
          />
        </div>

        <div className="form-group">
          <label>作者 *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="请输入作者姓名"
            required
          />
        </div>

        <div className="form-group">
          <label>摘要</label>
          <textarea
            name="abstractText"
            value={formData.abstractText}
            onChange={handleInputChange}
            placeholder="请输入论文摘要"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>论文文件 (PDF) *</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={uploading}
        >
          {uploading ? '上传中...' : '上传论文'}
        </button>
      </form>
    </div>
  );
}

export default PaperUpload;
