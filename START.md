# 论文解析系统 - 启动指南

## 技术架构

- **服务注册与发现**: Alibaba Nacos
- **网关**: Spring Cloud Gateway
- **服务通信**: OpenFeign + LoadBalancer
- **数据库**: MySQL

---

## 快速启动

### 1. 启动 Nacos

下载并启动 Nacos Server (默认端口 8848):

```bash
# 单机模式启动
cd nacos/bin
./startup.sh -m standalone  # Linux/Mac
startup.cmd -m standalone   # Windows
```

访问 http://localhost:8848/nacos
- 用户名: nacos
- 密码: nacos

### 2. 安装依赖

```bash
# 安装根目录依赖（concurrently）
npm install

# 安装前端依赖
cd frontend && npm install
```

### 3. 初始化数据库

```bash
mysql -u root -p < sql/init.sql
```

### 4. 启动后端服务

```bash
# 启动网关 (端口 8080)
npm run start:gateway

# 启动用户服务 (端口 8081)
npm run start:user

# 启动论文服务 (端口 8082)
npm run start:paper

# 启动AI引擎 (端口 8083)
npm run start:ai
```

或者使用 Maven 直接启动：

```bash
cd backend
mvn spring-boot:run -pl gateway-service
mvn spring-boot:run -pl user-service
mvn spring-boot:run -pl paper-service
mvn spring-boot:run -pl ai-engine
```

### 5. 启动前端

```bash
npm run start:frontend
# 或
cd frontend && npm start
```

访问 http://localhost:3000

---

## 服务端口

| 服务 | 端口 |
|------|------|
| Nacos | 8848 |
| Gateway | 8080 |
| User Service | 8081 |
| Paper Service | 8082 |
| AI Engine | 8083 |
| Frontend | 3000 |

---

## Nacos 配置说明

### 服务注册

各服务已配置自动注册到 Nacos:

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
        namespace: public
```

### 网关路由

网关使用 Nacos 服务发现进行动态路由:

```yaml
spring:
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
          lower-case-service-id: true
      routes:
        - id: paper-service
          uri: lb://paper-service
          predicates:
            - Path=/papers/**
```

---

## API 路由

通过网关访问：
- `POST http://localhost:8080/papers/upload` - 上传论文
- `GET http://localhost:8080/papers` - 论文列表
- `GET http://localhost:8080/papers/{id}` - 论文详情
- `POST http://localhost:8080/papers/{id}/analyze` - 分析论文
- `GET http://localhost:8080/users/{id}` - 用户信息
