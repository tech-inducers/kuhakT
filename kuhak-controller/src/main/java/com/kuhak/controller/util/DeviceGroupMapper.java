package com.kuhak.controller.util;


import com.kuhak.controller.dto.DeviceGroupDto;
import com.kuhak.controller.entity.DeviceGroup;
import com.kuhak.controller.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DeviceGroupMapper {
    @Autowired
    UserService userService;

    public DeviceGroupDto mapDeviceGroupToDeviceGroupDto(DeviceGroup deviceGroup){
        DeviceGroupDto deviceGroupDto = new DeviceGroupDto();
        deviceGroupDto.setDeviceGroupId(deviceGroup.getDeviceGroupId());
        deviceGroupDto.setDeviceGroupName(deviceGroup.getDeviceGroupName());
        deviceGroupDto.setActivated_on(deviceGroup.getActivated_on());
        deviceGroupDto.setCreated_At(deviceGroup.getCreated_At());
        deviceGroupDto.setUpdated_At(deviceGroup.getUpdated_At());
        deviceGroupDto.setValidUpto(deviceGroup.getValidUpto());
        deviceGroupDto.setUserId(deviceGroup.getUser().getUserId());

        return deviceGroupDto;
    }

    public DeviceGroup mapDeviceGroupDtoToDeviceGroup(DeviceGroupDto deviceGroupDto){
        DeviceGroup deviceGroup = new DeviceGroup();
        deviceGroup.setDeviceGroupId(deviceGroupDto.getDeviceGroupId());
        deviceGroup.setDeviceGroupName(deviceGroupDto.getDeviceGroupName());
        deviceGroup.setActivated_on(deviceGroupDto.getActivated_on());
        deviceGroup.setCreated_At(deviceGroupDto.getCreated_At());
        deviceGroup.setUpdated_At(deviceGroupDto.getUpdated_At());
        deviceGroup.setValidUpto(deviceGroupDto.getValidUpto());
        deviceGroup.setUser(userService.getUserById(deviceGroupDto.getUserId()));

        return deviceGroup;


    }
}
