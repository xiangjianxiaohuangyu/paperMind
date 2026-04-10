# PaperMind API 接口文档

## 基础信息

- 基础URL: `http://localhost:8080`
- 数据格式: JSON
- 编码: UTF-8

---

## 1. 论文服务 (Paper Service)

### 1.1 上传论文

**请求**

```
POST /papers/upload
Content-Type: multipart/form-data
```

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 论文标题 |
| author | string | 是 | 作者 |
| abstractText | string | 否 | 摘要 |
| file | file | 是 | PDF文件 |

**响应**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "论文标题",
    "author": "作者",
    "abstractText": "摘要内容",
    "filePath": "/path/to/file.pdf",
    "fileName": "original.pdf",
    "fileSize": 1024000,
    "status": "PENDING",
    "uploadTime": "2024-01-01T10:00:00"
  }
}
```

---

### 1.2 获取论文列表

**请求**

```
GET /papers
```

**响应**

```json
[
  {
    "id": 1,
    "title": "论文标题",
    "author": "作者",
    "status": "PENDING",
    "uploadTime": "2024-01-01T10:00:00"
  }
]
```

---

### 1.3 获取论文详情

**请求**

```
GET /papers/{id}
```

**响应**

```json
{
  "id": 1,
  "title": "论文标题",
  "author": "作者",
  "abstractText": "摘要内容",
  "filePath": "/path/to/file.pdf",
  "fileName": "original.pdf",
  "fileSize": 1024000,
  "status": "COMPLETED",
  "uploadTime": "2024-01-01T10:00:00",
  "analyzeTime": "2024-01-01T10:05:00"
}
```

---

### 1.4 分析论文

**请求**

```
POST /papers/{id}/analyze
```

**响应**

```json
{
  "success": true,
  "data": {
    "paperId": 1,
    "success": true,
    "summary": {
      "originalAbstract": "...",
      "generatedSummary": "..."
    },
    "keywords": ["keyword1", "keyword2"],
    "keyPoints": [
      {
        "title": "创新点",
        "description": "..."
      }
    ],
    "qualityMetrics": {
      "novelty": 85,
      "methodology": 78,
      "experimentalDesign": 82,
      "clarity": 90
    },
    "analysisTime": "2024-01-01T10:05:00"
  }
}
```

---

## 2. AI引擎服务 (AI Engine)

### 2.1 分析论文 (Mock)

**请求**

```
POST /ai/analyze/{paperId}
```

**响应**

```json
{
  "paperId": 1,
  "success": true,
  "summary": {
    "originalAbstract": "...",
    "generatedSummary": "..."
  },
  "keywords": ["Machine Learning", "Optimization"],
  "keyPoints": [
    {
      "title": "创新点",
      "description": "..."
    }
  ],
  "qualityMetrics": {
    "novelty": 85,
    "methodology": 78,
    "experimentalDesign": 82,
    "clarity": 90
  },
  "analysisTime": "2024-01-01T10:05:00"
}
```

---

## 3. 用户服务 (User Service)

### 3.1 获取用户信息

**请求**

```
GET /users/{id}
```

**响应**

```json
{
  "id": 1,
  "username": "user_1",
  "email": "user1@example.com",
  "role": "RESEARCHER"
}
```

---

## 附录

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| PENDING | 待分析 |
| ANALYZING | 分析中 |
| COMPLETED | 已完成 |
| FAILED | 失败 |

### 错误响应格式

```json
{
  "success": false,
  "message": "错误信息"
}
```

---

## 启动顺序

1. MySQL (端口 3306)
2. user-service (端口 8081)
3. paper-service (端口 8082)
4. ai-engine (端口 8083)
5. gateway-service (端口 8080)
6. frontend (端口 3000)
