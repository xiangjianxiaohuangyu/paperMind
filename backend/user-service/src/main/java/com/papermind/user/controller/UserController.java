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
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}
