package com.papermind.user.service;

import com.papermind.user.dto.AuthResponse;
import com.papermind.user.dto.LoginRequest;
import com.papermind.user.dto.RegisterRequest;
import com.papermind.user.entity.User;
import com.papermind.user.repository.UserRepository;
import com.papermind.user.utils.JwtUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**Service 层（业务层）→ 核心大脑
✅ 核心定位：项目的逻辑中枢（最重要的一层）
✅ 只干 1 件事：处理所有业务逻辑比如：判断用户是否存在、计算价格、校验数据、流程控制
✅ 工作方式：调用 Mapper 层拿数据 → 自己处理逻辑 → 返回给 Controller
✅ 规范：通常写 接口 + 实现类（解耦、易维护） */

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public AuthResponse register(RegisterRequest request) {
        // 检查用户名是否已存在
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists: " + request.getUsername());
        }

        // 创建新用户
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole("RESEARCHER");

        User savedUser = userRepository.save(user);

        // 生成 Token
        String token = jwtUtils.generateToken(savedUser.getUsername());

        return new AuthResponse(token, savedUser.getUsername(), savedUser.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        // 生成 Token
        String token = jwtUtils.generateToken(user.getUsername());

        return new AuthResponse(token, user.getUsername(), user.getRole());
    }
}
