package com.kuhak.controller.service.impl;

import com.kuhak.controller.dto.UserDto;
import com.kuhak.controller.entity.User;

import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.repository.UserRepository;
import com.kuhak.controller.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    @Override
    public User createUser(User user) {
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
    public User getUserByExtId(String userExtId) {

            return userRepo.findByUserExtId(userExtId).orElseThrow(()-> new ResourceNotFoundException(
                    "User not found with ext id"+ userExtId.toString()
            ));

    }

    @Override
    public void deleteUser(Long userId) {

    }

    @Override
    public User updateUser(User user) {
        if(!userRepo.existsById(user.getUserId())){
            throw new ResourceNotFoundException("User not found with id:"+
            user.getUserId()+" ext id:"+user.getUserExtId());
        }
        return userRepo.save(user);
    }

    @Override
    public List<UserDto> getAllUserByProviderId(Long providerId) {
        return userRepo.findByProviderProviderId(providerId).stream().map(usrR -> {
            UserDto usrdR = new UserDto();
            usrdR.setProviderId(usrR.getProvider().getProviderId());
            usrdR.setStatus(usrR.getStatus().toString());
            usrdR.setUserId(usrR.getUserId());
            usrdR.setActivated_on(usrR.getActivated_on());
            usrdR.setUserExtId(usrR.getUserExtId());
            usrdR.setUserName(usrR.getUserName());
            usrdR.setValidUpto(usrR.getValidUpto());

            return usrdR;
        }).collect(Collectors.toList());
    }
}
