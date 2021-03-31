package com.kuhak.controller.rest;

import com.kuhak.controller.dto.UserDto;
import com.kuhak.controller.entity.User;
import com.kuhak.controller.exception.ResourceNotFoundException;
import com.kuhak.controller.service.UserService;
import com.kuhak.controller.util.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
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
        userDto.setStatus("NEW");
        User user = userService.createUser(userMapper.mapUserDtoToUser(userDto));
        return userMapper.mapUserToUserDto(user);
    }

    //status change
    @PostMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody UserDto userDto){
        try{
            return new ResponseEntity<UserDto>(userMapper.mapUserToUserDto(userService
                    .updateUser(userMapper.mapUserDtoToUser(userDto))), HttpStatus.OK);
        }catch (Exception ex){
            throw new ResourceNotFoundException("User not found with id ===>"+userDto.getUserId());
        }

    }
    @GetMapping("/gatalluser/provider/{providerid}")
    public List<UserDto> getAllUserByProviderId(@PathVariable (value = "providerid") Long providerId){
        return userService.getAllUserByProviderId(providerId);
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@Valid @RequestBody UserDto userDto){
        if(userDto.getStatus().equals("ACTIVE")){
            userDto.setActivated_on(LocalDateTime.now());
        try{
            return new ResponseEntity<UserDto>(userMapper.mapUserToUserDto(userService
                    .updateUser(userMapper.mapUserDtoToUser(userDto))), HttpStatus.OK);
        }catch (Exception ex){
            throw new ResourceNotFoundException("User not found with id ===>"+userDto.getUserId());
        }}else{
            throw new ResourceNotFoundException("Invalid activation request for user id -->"
                    +userDto.getUserId());
        }

    }

    @PostMapping("/deactivate")
    public ResponseEntity<?> deactivate(@Valid @RequestBody UserDto userDto){
        if(userDto.getStatus().equals("DEACTIVE")){
            userDto.setValidUpto(LocalDateTime.now());
        try{
            return new ResponseEntity<UserDto>(userMapper.mapUserToUserDto(userService
                    .updateUser(userMapper.mapUserDtoToUser(userDto))), HttpStatus.OK);
        }catch (Exception ex){
            throw new ResourceNotFoundException("User not found with id ===>"+userDto.getUserId());
        }}else{
            throw new ResourceNotFoundException("Invalid deactivation request for user id -->"
                    +userDto.getUserId());
        }

    }
}
