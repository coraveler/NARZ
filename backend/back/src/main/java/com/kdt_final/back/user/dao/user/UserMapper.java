package com.kdt_final.back.user.dao.user;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.UserDTO;

@Mapper
public interface UserMapper {

    public List<User> findUserAll();
    public void createUser(User user);
    public List<User> findAllByUserNickname(String userNickname);
    public  List<User> findAllByLoginId(String loginId);
    public User findByLoginId(String loginId);
    public User findByLoginIdAndPassword(String loginId, String password);
    public void updateUser(User user);
    public User getUserInfo(Integer userId);
    public User findUserByLoginIdAndEmail(String loginId, String email);
    public void updateCode(String email, String userCode);
    public List<User> findAllByUserEmail(String email);
    public User findCodeByLoginId(String loginId, String userCode);
    public Integer updatePassword(String loginId, String password);
    public void deleteCode(String loginId);
    public void changeNicknameColor(UserDTO.UserRequestDTO userId);
    public String fetchNicknameColor(int userId);
    public void saveFileName(String fileName);
    public void updateLastLogin(String loginId);

}


