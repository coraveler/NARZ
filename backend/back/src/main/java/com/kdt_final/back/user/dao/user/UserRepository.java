package com.kdt_final.back.user.dao.user;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.AttendancePointRequestDTO;
import com.kdt_final.back.user.dto.AttendancePointResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;

@Repository
public interface UserRepository  {

    public List<User> findUserAll();
    public void createUser( User user);
    public List<User> findAllByUserNickname(String userNickname);
    public List<User> findAllByLoginId(String loginId);
    public User findByLoginId(String loginId);
    public User findByLoginIdAndPassword(String loginId, String password);
    public void updateUser(User user );
    public User getUserInfo(Integer userId);
    public User findUserByLoginIdAndEmail(String loginId, String email);
    public void updateCode(String email, String userCode);
    public List<User> findAllByUserEmail(String email);
    public User findCodeByLoginId(String loginId, String userCode);
    public Integer updatePassword(String loginId,String password);
    public void deleteCode(String loginId);
    public void updateAchievement(Integer userId, String achievementName);
    int getUserPostCount(Integer userId);
    List<String> getUserPostRegions(Integer userId);    public void changeNicknameColor(UserDTO.UserRequestDTO userId);
    public String fetchNicknameColor(int userId);

    void saveFileName(String fileName);

    int updateAchievementByUserId(int userId, String badgeName);
    public AttendancePointResponseDTO fetchAttendanceInfo(int userId);
    public void updateAttendanceDate(AttendancePointRequestDTO params);
}
