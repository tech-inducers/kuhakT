package com.kuhak.controller.util;

import com.kuhak.controller.dto.UserDto;
import com.kuhak.controller.entity.Provider;
import com.kuhak.controller.entity.User;
import com.kuhak.controller.entity.UserStatus;
import com.kuhak.controller.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    ProviderService providerService;

    public UserDto mapUserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setStatus(user.getStatus().toString());
        userDto.setActivated_on(user.getActivated_on());
        userDto.setValidUpto(user.getValidUpto());
        userDto.setProviderId(user.getProvider().getProviderId());

        return userDto;
    }

    public User mapUserDtoToUser(UserDto userDto ){
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setUserId(userDto.getUserId());
        user.setUserName(userDto.getUserName());
        user.setStatus(UserStatus.valueOf(userDto.getStatus()));
        user.setActivated_on(userDto.getActivated_on());
        user.setValidUpto(userDto.getValidUpto());
        user.setProvider(providerService.getProvider(userDto.getProviderId()));

        return user;
    }
}
