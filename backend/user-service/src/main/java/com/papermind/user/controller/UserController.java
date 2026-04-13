package com.papermind.user.controller;

import com.papermind.user.dto.AuthResponse;
import com.papermind.user.dto.LoginRequest;
import com.papermind.user.dto.RegisterRequest;
import com.papermind.user.entity.User;
import com.papermind.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**Controller 层（控制层）→ 对接前端
✅ 核心定位：前后端的大门 / 入口
✅ 对应你之前的代码：FastAPI 的 @app.post 接口
✅ 只干 3 件事：
1.接收前端 axios 发来的请求（参数、数据）
2.调用 Service 层，不写任何核心逻辑
3.把结果返回给前端
✅ 注解：@RestController✅ 禁止：绝不写业务逻辑、绝不操作数据库
*/

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 用户注册接口
     * 触发场景：用户在前端注册页面填写表单（用户名、邮箱、密码等）并提交时
     * HTTP方法：POST
     * 请求路径：/users/register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 用户登录接口
     * 触发场景：用户在登录页面输入用户名/邮箱和密码，点击登录按钮时
     * HTTP方法：POST
     * 请求路径：/users/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 根据ID获取用户信息接口
     * 触发场景：前端需要展示某个用户详情页时（如 /users/123 页面）
     * HTTP方法：GET
     * 请求路径：/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
