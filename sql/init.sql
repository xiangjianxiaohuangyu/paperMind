-- PaperMind 数据库初始化脚本

CREATE DATABASE IF NOT EXISTS paper_mind DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE paper_mind;

-- 论文表
CREATE TABLE IF NOT EXISTS paper (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '论文ID',
    title VARCHAR(500) NOT NULL COMMENT '论文标题',
    author VARCHAR(200) COMMENT '作者',
    abstract_text TEXT COMMENT '摘要',
    file_path VARCHAR(500) COMMENT '文件存储路径',
    file_name VARCHAR(200) COMMENT '原始文件名',
    file_size BIGINT COMMENT '文件大小(字节)',
    status VARCHAR(20) DEFAULT 'PENDING' COMMENT '状态: PENDING/ANALYZING/COMPLETED/FAILED',
    upload_time DATETIME COMMENT '上传时间',
    analyze_time DATETIME COMMENT '分析完成时间',
    INDEX idx_status (status),
    INDEX idx_upload_time (upload_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论文表';

-- 用户表 (预留，后续扩展)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    email VARCHAR(100) COMMENT '邮箱',
    role VARCHAR(20) DEFAULT 'RESEARCHER' COMMENT '角色',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
