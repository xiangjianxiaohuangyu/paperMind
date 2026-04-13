import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { paperAPI } from '../api';

function PaperUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const fileItems = [];
    const existingNames = new Set(uploadedFiles.map((f) => f.name));

    if (window.electronAPI) {
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        const filePath = file.path;

        if (!filePath) continue;

        const isDir = await window.electronAPI.isDirectory(filePath);

        if (isDir) {
          const pdfFiles = await window.electronAPI.scanDirectory(filePath);
          pdfFiles
            .filter((f) => f.name.toLowerCase().endsWith('.pdf') || f.name.toLowerCase().endsWith('.docx'))
            .forEach((f) => {
              if (!existingNames.has(f.name)) {
                existingNames.add(f.name);
                fileItems.push({
                  id: Math.random().toString(36).substring(7),
                  name: f.name,
                  size: f.size,
                  path: f.path,
                });
              }
            });
        } else if (file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx')) {
          if (!existingNames.has(file.name)) {
            existingNames.add(file.name);
            fileItems.push({
              id: Math.random().toString(36).substring(7),
              name: file.name,
              size: file.size,
              path: filePath,
            });
          }
        }
      }
    } else {
      Array.from(files)
        .filter((file) => file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx'))
        .forEach((file) => {
          if (!existingNames.has(file.name)) {
            existingNames.add(file.name);
            fileItems.push({
              id: Math.random().toString(36).substring(7),
              name: file.name,
              size: file.size,
              path: file.name,
            });
          }
        });
    }

    if (fileItems.length > 0) {
      setError(null);
      setUploadedFiles((prev) => [...prev, ...fileItems]);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const fileItems = [];
    const existingNames = new Set(uploadedFiles.map((f) => f.name));

    Array.from(files).forEach((file) => {
      if (file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx')) {
        if (existingNames.has(file.name)) {
          return;
        }
        existingNames.add(file.name);
        fileItems.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: file.size,
          path: file.name,
          file: file,
        });
      }
    });

    if (fileItems.length > 0) {
      setError(null);
      setUploadedFiles((prev) => [...prev, ...fileItems]);
    } else if (fileItems.length === 0 && files.length > 0) {
      setError('所有文件都已添加或文件格式不支持');
    }
    e.target.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedFiles.length === 0) {
      setError('请至少上传一个文件');
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      for (const fileData of uploadedFiles) {
        const uploadData = new FormData();

        if (fileData.file) {
          uploadData.append('file', fileData.file);
        } else if (fileData.path) {
          const response = await fetch(`file://${fileData.path}`);
          const blob = await response.blob();
          const file = new File([blob], fileData.name, {
            type: fileData.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          });
          uploadData.append('file', file);
        }

        const title = fileData.name.replace(/\.(pdf|docx)$/i, '');
        uploadData.append('title', title);

        const response = await paperAPI.upload(uploadData);
        if (!response.success) {
          throw new Error(response.message || '上传失败');
        }
      }

      setUploadedFiles([]);
      setMessage('文件上传成功！');
      setTimeout(() => {
        navigate('/list');
      }, 1500);
    } catch (err) {
      setError(err.message || '上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    return ext === 'pdf' ? '📕' : '📘';
  };

  return (
    <div className="paper-upload">
      <h2 className="page-title">上传论文</h2>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div
          ref={dropZoneRef}
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClickUpload}
        >
          <div className="drop-zone-icon">☁️</div>
          <div className="drop-zone-text">拖拽文件或文件夹到此处</div>
          <div className="drop-zone-text">或者点击选择文件</div>
          <div className="drop-zone-hint">支持 .pdf, .docx 格式</div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          onChange={handleFileSelect}
          className="upload-input"
        />

        {uploadedFiles.length > 0 && (
          <div className="file-list-section">
            <div className="file-list-header">
              <h3 className="file-list-title">已选择的文件 ({uploadedFiles.length})</h3>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading || uploadedFiles.length === 0}
              >
                {uploading ? '解析中...' : '开始解析'}
              </button>
            </div>
            <div className="file-list">
              {uploadedFiles.map((fileData) => (
                <div key={fileData.id} className="file-item">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(fileData.name)}</span>
                    <div className="file-details">
                      <span className="file-name">{fileData.name}</span>
                      <span className="file-size">{formatFileSize(fileData.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="file-remove"
                    onClick={() => handleRemoveFile(fileData.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default PaperUpload;