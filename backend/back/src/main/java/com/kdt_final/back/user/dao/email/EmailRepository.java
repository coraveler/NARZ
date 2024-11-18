package com.kdt_final.back.user.dao.email;

import com.kdt_final.back.user.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailRepository {

    public User saveCode(User user);

    public String findCodeByEmail(String email);

    public void deleEmailCode(String email);
}
