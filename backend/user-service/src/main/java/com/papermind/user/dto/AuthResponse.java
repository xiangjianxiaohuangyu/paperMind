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
 * 【本类用途】
 * 登录/注册成功后，返回给前端的认证信息
 * 包含：JWT Token、用户名、用户角色
 *
 * 【本类触发场景】
 * 登录或注册接口成功返回时，前端接收到此响应
 */
public class AuthResponse {
    private String token;
    private String username;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
