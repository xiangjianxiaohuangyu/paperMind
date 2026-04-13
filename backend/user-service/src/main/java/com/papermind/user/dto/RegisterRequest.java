package com.papermind.user.dto;

/**
 * DTO 层（Data Transfer Object，数据传输对象）
 *
 * 【核心定位】前后端数据传输的"包装盒"
 *
 * 【为什么需要 DTO】
 * 1. Entity 是直接和数据库表一一对应的（User ↔ users 表）
 * 2. 前端不需要知道数据库的内部结构，也不需要全部字段
 * 3. DTO 可以只暴露前端需要的字段，减少数据泄露风险
 *
 * 【举例】
 * - 前端注册时只需要传：username, password, email
 * - 但 User 实体可能还有：id, created_at, role, password_history 等
 * - 用 RegisterRequest 只接收前端真正需要的数据
 *
 * 【本类触发场景】
 * 前端用户在注册页面提交表单时，axios 发送 JSON 请求体
 */
public class RegisterRequest {
    private String username;
    private String password;
    private String email;

    public RegisterRequest() {
    }

    public RegisterRequest(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
