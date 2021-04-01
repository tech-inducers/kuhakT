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
        UserDto userToActivated = userMapper.mapUserToUserDto(userService.getUserById(userDto.getUserId()));
        userToActivated.setStatus("ACTIVE");
            userToActivated.setActivated_on(LocalDateTime.now());
        try{
            return new ResponseEntity<UserDto>(userMapper.mapUserToUserDto(userService
                    .updateUser(userMapper.mapUserDtoToUser(userToActivated))), HttpStatus.OK);
        }catch (Exception ex){
            throw new ResourceNotFoundException("User not found with id ===>"+userDto.getUserId());


    }}

    @PostMapping("/deactivate")
    public ResponseEntity<?> deactivate(@Valid @RequestBody UserDto userDto){
        UserDto userToDeActivated = userMapper.mapUserToUserDto(userService.getUserById(userDto.getUserId()));
        userToDeActivated.setStatus("DEACTIVE");
        userToDeActivated.setValidUpto(LocalDateTime.now());
        try{
            return new ResponseEntity<UserDto>(userMapper.mapUserToUserDto(userService
                    .updateUser(userMapper.mapUserDtoToUser(userToDeActivated))), HttpStatus.OK);
        }catch (Exception ex){
            throw new ResourceNotFoundException("User not found with id ===>"+userDto.getUserId());
        }

    }
}
