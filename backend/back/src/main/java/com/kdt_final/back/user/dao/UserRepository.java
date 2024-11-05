package com.kdt_final.back.user.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.UserDTO;

@Repository
public interface UserRepository  {

    public List<User> findUserAll();
    public void createUser( User user);
    public List<User> findAllByUserNickname(String userNickname);
    public List<User> findAllByLoginId(String loginId);
    public User findByLoginIdAndPassword(String loginId, String password);
    public void updateUser(User user );
    public User getUserInfo(Integer userId);
}
