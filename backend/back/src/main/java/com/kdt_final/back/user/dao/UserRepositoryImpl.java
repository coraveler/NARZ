package com.kdt_final.back.user.dao;

import com.kdt_final.back.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final UserMapper userMapper;

    @Override
    public List<User> findUserAll() {

        return userMapper.findUserAll();


    }


    @Override
    public void createUser( User user) {
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
    public User findByLoginIdAndPassword(String loginId, String password) {
        return userMapper.findByLoginIdAndPassword(loginId, password);
    }

    @Override
    public void updateUser(User user ) {
       userMapper.updateUser(user);

    }

}
