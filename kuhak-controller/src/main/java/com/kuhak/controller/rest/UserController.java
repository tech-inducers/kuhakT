package com.kuhak.controller.rest;

import com.kuhak.controller.dto.UserDto;
import com.kuhak.controller.entity.User;
import com.kuhak.controller.service.UserService;
import com.kuhak.controller.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserMapper userMapper;

    // get all user
    @GetMapping
    public List<UserDto> getAllUsers(){
        return userService.getAllUser().stream().map(user -> userMapper.mapUserToUserDto(user)).collect(Collectors.toList());
    }

    //Get User by Id
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable(value = "id") Long userId){
        User user = userService.getUserById(userId);
        return userMapper.mapUserToUserDto(user);
    }

    @GetMapping("/externalid/{extid}")
    public UserDto getUserByExtId(@PathVariable(value = "extid") Long userExtId){
        User user = userService.getUserByExtId(userExtId);
        return userMapper.mapUserToUserDto(user);
    }

    //Create User
    @PostMapping
    public UserDto createUser(@RequestBody UserDto userDto){
        User user = userService.createOrUpdateUser(userMapper.mapUserDtoToUser(userDto));
        return userMapper.mapUserToUserDto(user);
    }
}
