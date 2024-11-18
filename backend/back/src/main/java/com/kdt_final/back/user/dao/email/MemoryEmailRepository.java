package com.kdt_final.back.user.dao.email;

import com.kdt_final.back.user.domain.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class MemoryEmailRepository implements EmailRepository {

    private static Map<String, User> store =new HashMap<String, User>();

    @Override
    public User saveCode(User user) {
        user.setEmail(user.getEmail());
        user.setEmailCode(user.getEmailCode());
        store.put(user.getEmail(),user);
        store.put(user.getEmailCode(),user);


       return user;
    }

    @Override
    public String findCodeByEmail(String email) {
        User user = store.get(email);// 이메일을 키로 조회
        String result = user.getEmailCode();
        return result;

    }

    @Override
    public void deleEmailCode(String email) {
        User user = store.get(email);
        store.remove(email);

    }


}
