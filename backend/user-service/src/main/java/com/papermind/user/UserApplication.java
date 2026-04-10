package com.papermind.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @SpringBootApplication ≈
    @SpringBootConfiguration:本质是 @Configuration，表示这是一个配置类
    @EnableAutoConfiguration:自动帮你配置(数据库连接,Spring MVC,Jackson JSON,Tomcat)
    @ComponentScan：自动扫描当前包及子包。这些类（controller, srvice, repository）会被自动注册进 Spring 容器
    这就是为什么目录结构必须放在启动类的同级或子包下
 */

@SpringBootApplication
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);

        /**SpringApplication.run() 做了：
            ├── 1. 创建 Spring 应用上下文（ApplicationContext）
            ├── 2. 扫描并注册 Bean（组件、配置、服务等）
            ├── 3. 解析 application.properties / application.yml
            ├── 4. 启动内嵌的 Web 服务器（如 Tomcat、Jetty）
            ├── 5. 执行自动配置（根据 classpath 中的依赖）
            └── 6. 返回 ApplicationContext 对象 */
    }
}
