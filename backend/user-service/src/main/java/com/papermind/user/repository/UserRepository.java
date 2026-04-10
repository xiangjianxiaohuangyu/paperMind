package com.papermind.user.repository;

import com.papermind.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**Mapper / Dao 层（数据访问层）→ 操作数据库
✅ 核心定位：和数据库直接对话
✅ 只干 1 件事：执行增删改查（CRUD）比如：查询用户、保存订单、更新数据
✅ 完全不关心：业务逻辑，只负责读写数据库
✅ 对应技术：MyBatis / MyBatis-Plus 
*/
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
