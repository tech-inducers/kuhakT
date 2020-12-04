package com.kuhak.controller.service.impl;

import com.kuhak.controller.entity.User;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.UserRepository;
import com.kuhak.controller.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    @Override
    public User createOrUpdateUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException(
                "User not found with id :" + userId.toString()
        ));

    }

    @Override
    public void deleteUser(Long userId) {

    }
}
