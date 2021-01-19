package com.kuhak.controller.service;

import com.kuhak.controller.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    public User createOrUpdateUser(User user);
    public List<User> getAllUser();
    public User getUserById(Long userId);
    public User getUserByExtId(Long userExtId);
    public void deleteUser(Long userId);
}
