package com.kdt_final.back.user.dao.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.kdt_final.back.user.domain.User;
import com.kdt_final.back.user.dto.AttendancePointRequestDTO;
import com.kdt_final.back.user.dto.AttendancePointResponseDTO;
import com.kdt_final.back.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final UserMapper userMapper;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<User> findUserAll() {

        return userMapper.findUserAll();
    }

    @Override
    public void createUser(User user) {
        userMapper.createUser(user);
    }

    @Override
    public List<User> findAllByUserNickname(String userNickname) {
        return userMapper.findAllByUserNickname(userNickname);

    }

    @Override
    public List<User> findAllByLoginId(String loginId) {
        return userMapper.findAllByLoginId(loginId);
    }

    @Override
    public User findByLoginId(String loginId) {
        return userMapper.findByLoginId(loginId);
    }

    @Override
    public User findByLoginIdAndPassword(String loginId, String password) {
        return userMapper.findByLoginIdAndPassword(loginId, password);
    }

    @Override
    public void updateUser(User user) {
        userMapper.updateUser(user);

    }

    @Override
    public User getUserInfo(Integer userId) {
        return userMapper.getUserInfo(userId);

    }

    @Override
    public User findUserByLoginIdAndEmail(String loginId, String email) {
        return userMapper.findUserByLoginIdAndEmail(loginId, email);
    }

    @Override
    public void updateCode(String email, String userCode) {
        userMapper.updateCode(email, userCode);
    }

    @Override
    public List<User> findAllByUserEmail(String email) {
        return userMapper.findAllByUserEmail(email);
    }

    @Override
    public User findCodeByLoginId(String loginId, String userCode) {
        return userMapper.findCodeByLoginId(loginId, userCode);
    }

    @Override
    public Integer updatePassword(String loginId, String password) {
        return userMapper.updatePassword(loginId, password);
    }

    @Override
    public void deleteCode(String loginId) {
        userMapper.deleteCode(loginId);
    }

    @Override
    public void changeNicknameColor(UserDTO.UserRequestDTO userId) {
        userMapper.changeNicknameColor(userId);
    }

    @Override
    public String fetchNicknameColor(int userId) {
        return userMapper.fetchNicknameColor(userId);
    }

    @Override
    public void saveFileName(String fileName) {

    }

    @Override
    public void updateAchievement(Integer userId, String achievementName) {
        String sql = "UPDATE user SET achievement = ? WHERE userId = ?";
        jdbcTemplate.update(sql, achievementName, userId);
    }

    @Override
    public int getUserPostCount(Integer userId) {
        String sql = "SELECT COUNT(*) FROM post WHERE userId = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, userId);
    }

    @Override
    public List<String> getUserPostRegions(Integer userId) {
        String sql = "SELECT DISTINCT local FROM post WHERE userId = ?";
        return jdbcTemplate.queryForList(sql, String.class, userId);
    }

    @Override
    public int updateAchievementByUserId(int userId, String badgeName) {
        String sql = "UPDATE user SET achievement = ? WHERE userId = ?";
        return jdbcTemplate.update(sql, badgeName, userId);
    }

    @Override
    public AttendancePointResponseDTO fetchAttendanceInfo(int userId){
        AttendancePointResponseDTO result = userMapper.fetchAttendanceInfo(userId);
        return result;
    }

    @Override
    public void updateAttendanceDate(AttendancePointRequestDTO params){
        userMapper.updateAttendanceDate(params);
    }
}
