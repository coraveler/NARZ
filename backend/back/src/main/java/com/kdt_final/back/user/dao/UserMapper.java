package com.kdt_final.back.user.dao;


import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.UserDTO;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    public List<User> findUserAll();
    public void createUser(User user);
    public List<User> findAllByUserNickname(String userNickname);
    public  List<User> findAllByLoginId(String loginId);
    public User findByLoginIdAndPassword(String loginId, String password);
    public void updateUser(User user);
    public User getUserInfo(Integer userId);
}


