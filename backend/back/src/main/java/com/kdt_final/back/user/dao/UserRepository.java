package com.kdt_final.back.user.dao;

import com.kdt_final.back.user.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository  {

    public List<User> findUserAll();

}
