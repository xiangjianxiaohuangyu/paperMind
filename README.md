# PaperMind 论文解析系统

论文上传、存储、展示、AI分析的一站式系统。

## 技术栈

**后端**
- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- Spring Cloud Alibaba 2023.0.1.0
- Spring Security 6.x + JWT
- Spring Data JPA
- Alibaba Nacos

**前端**
- React 18
- Axios
- React Router

**数据库**
- MySQL 8.0
- 文件存储: 本地文件系统

## 项目结构

```
paperMind/
├── backend/
│   ├── pom.xml                    # 父POM
│   ├── gateway-service/           # 网关服务 (8080)
│   ├── user-service/             # 用户服务 (8081)
│   ├── paper-service/             # 论文服务 (8082)
│   └── ai-engine/                 # AI引擎 (8083)
├── frontend/                      # React前端 (3000)
├── work_log/                      # 工作日志
└── sql/                           # 数据库脚本
```

## 服务端口

| 服务 | 端口 |
|------|------|
| Gateway | 8080 |
| User Service | 8081 |
| Paper Service | 8082 |
| AI Engine | 8083 |
| Frontend | 3000 |
| Nacos | 8848 |
| MySQL | 3307 |

## 快速启动

### 1. 环境准备

- JDK 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8.0+
- Nacos 2.x

### 2. 数据库初始化

```sql
mysql -u root -p < sql/init.sql
```

### 3. 启动 Nacos

```bash
cd nacos/bin
./startup.sh -m standalone  # Linux/Mac
startup.cmd -m standalone    # Windows
```

访问 http://localhost:8848/nacos (用户名/密码: nacos/nacos)

### 4. 启动后端服务

```bash
# 分别启动各服务
npm run start:user
npm run start:ai
npm run start:paper
npm run start:gateway
```

### 5. 启动前端

```bash
cd frontend
npm install
npm start
```

访问 http://localhost:3000

## API 接口

### 用户服务 (8081)

| 接口 | 方法 | 说明 |
|------|------|------|
| `/users/register` | POST | 用户注册 |
| `/users/login` | POST | 用户登录 |
| `/users/{id}` | GET | 获取用户信息 |

### 论文服务 (8082)

| 接口 | 方法 | 说明 |
|------|------|------|
| `/papers/upload` | POST | 上传论文 |
| `/papers` | GET | 论文列表 |
| `/papers/{id}` | GET | 论文详情 |
| `/papers/{id}/analyze` | POST | 分析论文 |

### AI 引擎 (8083)

| 接口 | 方法 | 说明 |
|------|------|------|
| `/ai/analyze/{paperId}` | POST | Mock 分析结果 |

## 项目日志

详见 [work_log/2026-04-10.md](work_log/2026-04-10.md)

## License

MIT
